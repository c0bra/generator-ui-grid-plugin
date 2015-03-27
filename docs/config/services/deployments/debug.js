"use strict";

var pkg = require('../../package.json');

module.exports = function debugDeployment() {
  return {
    name: 'debug',
    scripts: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
    ],
    stylesheets: [
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'css/docs.css'
    ]
  };
};