/* eslint-env browser */
/* global angular */
(function() {
  'use strict';

  var wskFeedback = angular.module('wskFeedback', [
    'ngRoute',
    'firebase'
  ]);

  wskFeedback.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/main-content.html',
          controller: 'MainContentCtrl'
        })
        .when('/average-rating', {
          templateUrl: 'templates/average-rating.html',
          controller: 'AverageRatingCtrl'
        })
        .when('/rating-count', {
          templateUrl: 'templates/rating-count.html',
          controller: 'RatingCountCtrl'
        })
        .when('/feedbacks', {
          templateUrl: 'templates/feedbacks.html',
          controller: 'FeedbacksCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
})();
