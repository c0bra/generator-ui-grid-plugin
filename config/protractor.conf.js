'use strict';

exports.config = {
  allScriptsTimeout: 11000,

  baseUrl: 'http://localhost:8000/',

  rootElement: '[ng-app]',

  framework: 'jasmine',

  // specs: [
  //   '../.tmp/docs/ptore2e/**/*.js',
  //   '../.tmp/docs/examples/**/*.js'
  // ],

  onPrepare: function() {
    /* global angular: false, browser: false, jasmine: false */

    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
        $animate.enabled(false);
      }]);
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);

    // Store the name of the browser that's currently being used.
    browser.getCapabilities().then(function(caps) {
      browser.params.browser = caps.get('browserName');
    });
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    showTiming: true
  }
};