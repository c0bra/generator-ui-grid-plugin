'use strict';

describe('Plugin', function () {
  var $rootScope, $timeout, ExamplePluginService;

  beforeEach(module('ui.grid.example-plugin'));
  beforeEach(inject(function (_$rootScope_, _$timeout_, _ExamplePluginService_) {
    $timeout = _$timeout_;
    $rootScope = _$rootScope_;
    ExamplePluginService = _ExamplePluginService_;
  }));

  describe('delayedUppercase', function () {
    it('Returns a promise with input uppercased ', function (done) {
      var p = ExamplePluginService.delayUppercase('test');

      p.then(function(output) {
        expect(output).toEqual('TEST');
        done();
      });
      
      $timeout.flush();
    });
  });
});