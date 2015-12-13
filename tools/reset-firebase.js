'use strict';

const Firebase = require('firebase');
const request = require('request');
const FEEDBACKS_URL = 'http://cache.usabilla.com/example/apidemo.json';
const DB_HANDLE = new Firebase('https://wsk-feedback.firebaseio.com');

/**
 * Clean feedbacks from firebase
 * @param {object} handle Firebase database handle
 * @return {object} Promise with either success or failure
 */
function cleanFeedbacks(handle) {
  console.log('Cleaning Feedbacks');

  let promise = new Promise(function(resolve, reject) {
    handle.remove(function(err) {
      if (err) {
        reject('Failed to reset Firebase!');
      } else {
        resolve(FEEDBACKS_URL);
      }
    });
  });

  return promise;
}

/**
 * Use request module to fetch the feedbacks URL
 * @param {string} url the feedbacks URL
 * @return {object} a promise with either feedbacks list or error message
 */
function fetchFeedbacks(url) {
  console.log('Fetching Feedbacks');

  let promise = new Promise(function(resolve, reject) {
    request(url, function(err, res, body) {
      if (err || res.statusCode !== 200) {
        return reject(err);
      }

      let feedbacks = [];
      try {
        feedbacks = JSON.parse(body).items;
      } catch (e) {
        return reject('Failed to parse json with err: ' + e);
      }

      resolve(feedbacks);
    });
  });

  return promise;
}

/**
 * Simplify feedback json and calculate the average rating
 * @param {object} feedbacks original feedback data
 * @return {object} simplified version of feedback data
 */
function simplifyFeedbacks(feedbacks) {
  console.log('simplifing Feedbacks..');

  let promise = new Promise(function(resolve, reject) {
    let list = [];
    let count = 0;
    let totalRating = 0;
    let countByRating = {
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 0,
      rating5: 0
    };

    for (let feedback of feedbacks) {
      let rating = feedback.rating;

      // Skip invalid feedback
      if (!rating) {
        continue;
      }

      count += 1;
      totalRating += rating;
      countByRating['rating' + rating] += 1;

      let computedBrowser = feedback.computed_browser || {};
      list.push({
        browserName: computedBrowser.Browser,
        browserVersion: computedBrowser.Version,
        platform: computedBrowser.Platform,
        geo: feedback.geo,
        rating: feedback.rating,
        labels: feedback.labels
      });
    }

    if (list.length === 0) {
      return reject('No feedbacks with rating');
    }

    let simplified = {
      feedbacks: list,
      count: count,
      countByRating: countByRating,
      averageRating: totalRating / count
    };

    resolve(simplified);
  });

  return promise;
}

/**
 * Write feedbacks to firebase
 * @param {object} data JSON object data
 * @return {object} a promise with either success or failure message
 */
function writeFeedbacks(data) {
  console.log('Writing Feedbacks');

  let promise = new Promise(function(resolve, reject) {
    DB_HANDLE.set(data, function(err) {
      if (err) {
        reject('Failed to update Firebase');
      } else {
        resolve('Feedbacks written');
      }
    });
  });

  return promise;
}

/**
 * Main error function, it will exit the process
 * @param {string} err error string
 * @return {void} no return value
 */
function errorHandler(err) {
  console.log(err);
  process.exit(1);
}

cleanFeedbacks(DB_HANDLE)
.then(fetchFeedbacks, errorHandler)
.then(simplifyFeedbacks, errorHandler)
.then(writeFeedbacks, errorHandler)
.then(function(msg) {
  console.log(msg);
  process.exit(0);
}, errorHandler);
