"use strict";

var pkg = require('../../package.json');

module.exports = function debugDeployment() {
  return {
    name: 'debug',
    // examples: {
    //   commonFiles: {
    //     scripts: [
    //       '../../bower_components/angular/angular.js',
    //       '../../bower_components/angular-ui-grid/ui-grid.js',
    //       // '../../js/docs.utils.js',
    //       '../../js/' + pkg.name + '.js'
    //     ],
    //     stylesheets: [
    //       '../../css/docs.utils.css'
    //       '../../.tmp/docs.utils.css'
    //     ]
    //   },
    //   dependencyPath: '../../../'
    // },
    scripts: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      // 'bower_components/google-code-prettify/src/prettify.js',
      // 'bower_components/google-code-prettify/src/lang-css.js',
      'js/nav-data.js',
      'js/pages-data.js',
      'js/docs-bootstrap.js',
      'js/docs.js',
      'js/smeans.js'
    ],
    stylesheets: [
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'css/docs.css'
    ]
  };
};