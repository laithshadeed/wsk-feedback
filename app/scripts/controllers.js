/* eslint-env browser */
/* global angular */
(function() {
  'use strict';

  angular
    .module('wskFeedback')
    .controller('MainContentCtrl', MainContentCtrl)
    .controller('AverageRatingCtrl', AverageRatingCtrl)
    .controller('RatingCountCtrl', RatingCountCtrl)
    .controller('FeedbacksCtrl', FeedbacksCtrl);

  MainContentCtrl.inject = ['$rootScope'];
  /**
   * Empty Main controller
   */
  function MainContentCtrl() {
  }

  AverageRatingCtrl.inject = ['$rootScope', 'wskFeedbackService'];

  /**
   * Average Rating controller, it will call firebase service
   * It will populate a number in scope.averageRating
   * @param {object} $scope angular scope
   * @param {object} wskFeedbackService service that connects to firebase
   */
  function AverageRatingCtrl($scope, wskFeedbackService) {
    $scope.averageRating = wskFeedbackService.getAverageRating();
  }

  RatingCountCtrl.inject = ['$rootScope', 'wskFeedbackService'];

  /**
   * Rating count controller, it will call firebase service
   * it will populate an object in scopre.ratingCount
   * @param {object} $scope angular scope
   * @param {object} wskFeedbackService service that connects to firebase
   */
  function RatingCountCtrl($scope, wskFeedbackService) {
    $scope.ratingCount = wskFeedbackService.getRatingCount();
  }

  FeedbacksCtrl.inject = ['$rootScope', 'wskFeedbackService'];

  /**
   * Feedbacks controller, it will call firebase service
   * It will populate an array in scope.feedbacks
   * @param {object} $scope angular scope
   * @param {object} wskFeedbackService service that connects to firebase
   */
  function FeedbacksCtrl($scope, wskFeedbackService) {
    $scope.feedbacks = wskFeedbackService.getFeedbacks();
  }
})();
