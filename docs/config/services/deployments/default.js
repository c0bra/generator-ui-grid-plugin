'use strict';

var buildConfig = require('../../../../config/build.config');

module.exports = function defaultDeployment() {
  return {
    name: 'default',
    examples: {
      commonFiles: {
        scripts: [
          'js/' + buildConfig.name + '.min.js'
        ],
        stylesheets: [
          
        ]
      },
      dependencyPath: '../../../'
    },
    scripts: [
      'js/' + buildConfig.name + '.min.js'
    ],
    stylesheets: [
      
    ]
  };
};