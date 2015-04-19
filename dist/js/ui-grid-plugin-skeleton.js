/*!
 * ui-grid-plugin-skeleton
 * https://github.com/c0bra/ui-grid-plugin-skeleton
 * @license MIT
 * v0.1.0
 * 2015-04-19T13:26:21.049Z
 */
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
 * @module ui.grid.examplePlugin
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

(function(module) {
try {
  module = angular.module('ui.grid.plugin.skeleton');
} catch (e) {
  module = angular.module('ui.grid.plugin.skeleton', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ui.grid.plugin.skeletonpluginTemplate.html',
    '<div class="title">Title Block</div>');
}]);
})();
