'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist/js', 'dist/css'], { read: false }).pipe($.clean());
});

gulp.task('js', function () {

});

gulp.task('build', function () {
  
});