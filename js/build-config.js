
try {
  angular.module('constants')
}
catch (e) {
  angular.module('constants', []);
}

angular.module('constants')
.constant('BUILDCONFIG', {
  "pkg": {
    "name": "ui-grid-plugin-skeleton",
    "version": "0.0.0",
    "description": "Skeleton project for Angular UI-Grid plugins",
    "repository": {
      "type": "git",
      "url": "https://github.com/c0bra/ui-grid-plugin-skeleton.git"
    },
    "scripts": {
      "test": "gulp test"
    },
    "author": "Brian Hann",
    "license": "MIT",
    "devDependencies": {
      "canonical-path": "0.0.2",
      "child-proc": "0.0.1",
      "coveralls": "~2.11.2",
      "del": "^1.1.1",
      "dgeni": "^0.4.1",
      "dgeni-packages": "^0.10.12",
      "gh-pages": "~0.2.0",
      "gulp": "^3.8.11",
      "gulp-autoprefixer": "^2.1.0",
      "gulp-bump": "~0.3.0",
      "gulp-cached": "^1.0.4",
      "gulp-concat": "^2.5.2",
      "gulp-connect": "^2.2.0",
      "gulp-header": "~1.2.2",
      "gulp-jscs": "^1.4.0",
      "gulp-jscs-stylish": "^1.0.2",
      "gulp-jshint": "^1.9.4",
      "gulp-json-transform": "~0.2.0",
      "gulp-less": "^3.0.2",
      "gulp-load-plugins": "^0.9.0",
      "gulp-ng-annotate": "^0.5.2",
      "gulp-ng-html2js": "^0.2.0",
      "gulp-minify-css": "^1.0.0",
      "gulp-minify-html": "^1.0.1",
      "gulp-order": "^1.1.1",
      "gulp-progeny": "0.0.7",
      "gulp-protractor": "^1.0.0",
      "gulp-remember": "^0.3.0",
      "gulp-rename": "^1.2.0",
      "gulp-size": "^1.2.1",
      "gulp-sourcemaps": "^1.5.1",
      "gulp-uglify": "^1.1.0",
      "gulp-util": "~3.0.4",
      "karma": "~0.12.31",
      "karma-coverage": "~0.2.7",
      "karma-chrome-launcher": "~0.1.7",
      "karma-firefox-launcher": "~0.1.4",
      "karma-jasmine": "~0.3.5",
      "karma-phantomjs-launcher": "~0.1.4",
      "jasmine-core": "~2.2.0",
      "jshint-stylish": "^1.0.1",
      "lodash": "^3.6.0",
      "merge-stream": "^0.1.7",
      "protractor": "^2.0.0",
      "q": "^1.2.0",
      "run-sequence": "^1.0.2",
      "yargs": "^3.6.0"
    }
  },
  "name": "ui-grid-plugin-skeleton",
  "moduleName": "ui.grid.plugin.skeleton",
  "readableName": "UI-Grid Plugin Skeleton",
  "version": "0.0.0",
  "ngVersion": "1.3.15",
  "repository": "https://github.com/c0bra/ui-grid-plugin-skeleton",
  "commit": "36afac81d83101b70ce1906b8566af4041fc87fa",
  "tag": "",
  "date": "2015-04-16 13:48:56 -0500",
  "versionTagExists": true
});