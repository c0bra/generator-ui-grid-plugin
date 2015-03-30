(function () {
'use strict';

/**
 * @ngdoc module
 * @name ui.grid.example-plugin
 * @description Main plugin module
 */
angular.module('ui.grid.example-plugin', ['ui.grid'])

.service('ExamplePluginService', function ($timeout) {
  return {
    delayUppercase: function delayUppercase(input) {
      return $timeout(function () {
        return input.toUpperCase();
      }, 200);
    }
  };
});

})();
