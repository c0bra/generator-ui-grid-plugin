(function(angular) {
  'use strict';
angular.module('app', [])

.controller('MainCtrl', function ($scope) {
  $scope.out = 'Hello World!';

  //$scope.out = ExamplePluginService.uppercase($scope.out);
});
})(window.angular);