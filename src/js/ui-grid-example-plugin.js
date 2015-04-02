(function () {
'use strict';

/**
 * @ngdoc module
 * @name ui.grid.examplePlugin
 * @description Main plugin module
 */
angular.module('ui.grid.examplePlugin', ['ui.grid'])

/**
 * @ngdoc service
 * @name ExamplePluginService
 * @module ui.grid.examplePlugin
 * 
 * @description Simple example service
 */
.service('ExamplePluginService', function ($timeout) {
  return {
    /**
     * @ngdoc function
     * @name delayUppercase
     * @memberOf ui.grid.examplePlugin:ExamplePluginService
     * @param {String} input String to uppercase
     * @returns {Promise} Promise that is resolved with the input uppercased.
     * @description
     */
    delayUppercase: function delayUppercase(input) {
      return $timeout(function () {
        return input.toUpperCase();
      }, 200);
    }
  };
})

/**
 * @ngdoc directive
 * @name exampleDirective
 * @module ui.grid.examplePlugin
 * @description test
 */
.directive('exampleDirective', function() {
  return function ($scope, $elm, $attrs) {

  };
});

})();
