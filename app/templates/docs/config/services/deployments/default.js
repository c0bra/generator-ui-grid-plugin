'use strict';

var buildConfig = require('../../../../config/build.config');

// var cdnurl = '//cdn.rawgit.com/' + repourlwhatever

module.exports = function defaultDeployment() {
  return {
    name: 'default',
    examples: {
      commonFiles: {
        scripts: [
          '../../bower_components/angular/angular.min.js',
          '../../bower_components/angular-ui-grid/ui-grid.min.js',
          '../../dist/js/' + buildConfig.name + '.min.js',
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
