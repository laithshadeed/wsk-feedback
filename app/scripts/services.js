//* eslint-env browser */
/* global angular, Firebase */
(function() {
  'use strict';

  angular
    .module('wskFeedback')
    .factory('wskFeedbackService', wskFeedbackService);

  wskFeedbackService.$inject = [
    'FIREBASE_URL',
    '$firebaseObject',
    '$firebaseArray'
  ];

  /**
   * Main service
   * @param {string} FIREBASE_URL defined in constants.js
   * @param {object} $firebaseObject defined in angularFire lib
   * @param {object} $firebaseArray defined in angularFire lib
   * @return {object} the service object
   */
  function wskFeedbackService(FIREBASE_URL, $firebaseObject, $firebaseArray) {
    var root = new Firebase(FIREBASE_URL);

    /**
     * getAverageRating is wrapper around firebaseObject of averageRating
     * @return {object} an object of averageRating
     */
    function getAverageRating() {
      return $firebaseObject(root.child('averageRating'));
    }

    /**
     * getRatingCount is wrapper around firebaseObject of countByRating
     * @return {object} an object of countByRating
     */
    function getRatingCount() {
      return $firebaseObject(root.child('countByRating'));
    }

    /**
     * getFeedbacks is wrapper around firebaseArray of feedbacks
     * @return {object} an object of feedbacks
     */
    function getFeedbacks() {
      return $firebaseArray(root.child('feedbacks'));
    }

    var service = {
      getAverageRating: getAverageRating,
      getRatingCount: getRatingCount,
      getFeedbacks: getFeedbacks
    };

    return service;
  }
})();
