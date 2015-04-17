/*!
 * ui-grid-plugin-skeleton
 * https://github.com/c0bra/ui-grid-plugin-skeleton
 * @license MIT
 * v0.0.0
 * 2015-04-17T21:07:41.525Z
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
.service('ExamplePluginService', ["$timeout", function ($timeout) {
  return {
    /**
     * @ngdoc function
     * @name delayUppercase
     * @memberOf ui.grid.examplePlugin:ExamplePluginService
     * @param {String} input String to uppercase
     * @returns {Promise} Promise that is resolved with the input uppercased.
     * @description
     */
    uppercase: function uppercase(input) {
      return input.toString().toUpperCase();
    }
  };
}])

/**
 * @ngdoc directive
 * @name exampleDirective
 * @module ui.grid.examplePlugin
 * @description test
 */
.directive('examplePluginDirective', function() {
  return {
    replace: true,
    transclude: true,
    template: '<div><strong ng-transclude></strong></div>',
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
