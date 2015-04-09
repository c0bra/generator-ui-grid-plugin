'use strict';

var buildConfig = require('../../../../config/build.config');

// var cdnurl = '//cdn.rawgit.com/' + repourlwhatever

module.exports = function defaultDeployment() {
  return {
    name: 'default',
    examples: {
      commonFiles: {
        scripts: [
          '/bower_components/angular/angular.min.js',
          '/js/' + buildConfig.name + '.min.js'
        ],
        stylesheets: [
          
        ]
      },
      dependencyPath: '../../../'
    },
    scripts: [
      '/bower_components/angular/angular.min.js',
      '/js/' + buildConfig.name + '.min.js'
    ],
    stylesheets: [
      
    ]
  };
};