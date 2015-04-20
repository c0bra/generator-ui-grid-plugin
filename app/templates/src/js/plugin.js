(function () {
'use strict';

/**
 * @ngdoc module
 * @name ui.grid.plugin
 * @description Main plugin module
 */
angular.module('ui.grid.plugin', ['ui.grid'])

/**
 * @ngdoc service
 * @name ExamplePluginService
 * @module ui.grid.plugin
 *
 * @description Simple example service
 */
.service('ExamplePluginService', function () {
  return {
    /**
     * @ngdoc method
     * @name ExamplePluginService#uppercase
     * @param {String} input String to uppercase
     * @returns {String} Uppercased string
     * @description Simple example function
     */
    uppercase: function uppercase(input) {
      return input.toString().toUpperCase();
    }
  };
})

/**
 * @ngdoc directive
 * @name exampleDirective
 * @module ui.grid.plugin
 * @description test
 */
.directive('examplePluginDirective', function () {
  return {
    replace: true,
    transclude: true,
    template: '<div class="click-me"><strong ng-transclude></strong></div>',
    link: function ($scope, $elm, $attrs) {
      $elm.on('click', function () {
        $elm.toggleClass('toggled');
      });
    }
  };
});

})();
