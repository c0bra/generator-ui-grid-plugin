@ngdoc content
@name Start
@description

# UI-Grid Plugin Skeleton

This module is a skeleton for you to use to create your own UI-Grid plugins, complete with unit tests, automatic documentation generation, and a build process.

<br>
<br>

<example name="example-name" module="app">
  <file name="index.html" type="html">
    <div ng-controller="MainCtrl">
      Custom directive output below:
      <br>
      <br>
      <example-plugin-directive class="test-directive">Test output</example-plugin-directive>
    </div>
  </file>
  <file name="app.js">
    angular.module('app', ['ui.grid.examplePlugin'])

    .controller('MainCtrl', function ($scope, ExamplePluginService) {
      $scope.out = 'Hello World!';

      ExamplePluginService.delayUppercase($scope.out)
        .then(function (out) {
          $scope.out = out;
        });
    });
  </file>
  <file name="protractor.js" type="protractor">
    describe('Plugin directive', function () {
      it('should output strong text', function () {
        expect(element(by.id('test-directive')).isPresent()).toBeTruthy();
      });
    });
  </file>
</example>