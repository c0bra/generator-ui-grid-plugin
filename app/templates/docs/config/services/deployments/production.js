'use strict';

var buildConfig = require('../../../../config/build.config');

// Parse repo name from url
// https://github.com/c0bra/ui-grid-plugin-skeleton.git
var repoPart = '';
if (buildConfig.repository) {
  repoPart = buildConfig.repository.match(/github.com\/(.+?)$/)[1];
}
// c0bra/ui-grid-plugin-skeleton

// https://cdn.rawgit.com/c0bra/ui-grid-plugin-skeleton/0.0.1/dist/js/ui-grid-plugin-skeleton.js
var cdnurl = '//rawgit.com/' + repoPart;

// If we don't have a tag for the version in package.json yet, use it in a cdn url as we are going to create the tag
if (!buildConfig.versionTagExists) {
  cdnurl = cdnurl.replace('rawgit.com', 'cdn.rawgit.com');
  cdnurl += '/' + buildConfig.version;
}

module.exports = function productionDeployment() {
  return {
    name: 'production',
    examples: {
      commonFiles: {
        scripts: [
          cdnurl + '/bower_components/angular/angular.min.js',
          cdnurl + '/bower_components/angular-ui-grid/ui-grid.min.js',
          cdnurl + '/dist/js/' + buildConfig.name + '.min.js',
        ],
        stylesheets: [
          cdnurl + '/dist/css/' + buildConfig.name + '.min.css',
        ]
      },
      dependencyPath: '../../../'
    },
    scripts: [
      cdnurl + '/bower_components/angular/angular.min.js',
      cdnurl + '/bower_components/angular-ui-grid/ui-grid.min.js',
      cdnurl + '/dist/js/' + buildConfig.name + '.min.js'
    ],
    stylesheets: [
      cdnurl + '/dist/css/' + buildConfig.name + '.min.css',
    ]
  };
};
