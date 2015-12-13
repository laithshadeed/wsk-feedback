/* eslint-env browser */
/* global angular, Firebase */
(function() {
  'use strict';

  angular.module('wskFeedback', ['firebase'])
  .controller('FeedbackController', function($scope, $firebaseObject) {
    var ref = new Firebase('https://wsk-feedback.firebaseio.com');
    $scope.data = $firebaseObject(ref);
  });
})();
