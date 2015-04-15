(function(angular) {
  'use strict';
angular.module('app', ['ui.grid.examplePlugin'])

.controller('MainCtrl', function ($scope) {
  $scope.out = 'Hello World!';
});
})(window.angular);