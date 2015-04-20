'use strict';

var buildConfig = require('../../../../config/build.config');

module.exports = function debugDeployment() {
  return {
    name: 'debug',
    examples: {
      commonFiles: {
        scripts: [
          '../../bower_components/angular/angular.js',
          '../../bower_components/angular-ui-grid/ui-grid.js',
          '../../dist/js/' + buildConfig.name + '.js'
        ],
        stylesheets: [

        ]
      }
    },
    scripts: [

    ],
    stylesheets: [

    ]
  };
};
