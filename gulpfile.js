'use strict';

var gulp = require('gulp');
var del = require('del');
var pkg = require('./package.json');

var paths = {
  clean: 'dist',
  js: ['src/js/**/*.js'],
  test: ['test/*.spec.js'],
  less: {
    main: 'src/less/main.less',
    watch: ['src/less/**/*.less']
  }
}

// Load plugins
var $ = require('gulp-load-plugins')({
  rename: {
    'gulp-ng-annotate': 'ngAnnotate',
    'gulp-jscs-stylish': 'jscsStylish',
    'gulp-minify-css': 'minifyCSS'
  }
});

// Clean
gulp.task('clean', function (cb) {
  del(paths.clean, cb);
});

// Check gulpfile
gulp.task('gulpfile', function () {
  return gulp.src('gulpfile.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
})

gulp.task('js', ['clean'], function () {
  return gulp.src(paths.js)
    .pipe($.cached('js'))
    .pipe($.jshint())
    // .pipe($.jshint.reporter('fail'))
    .pipe($.jscs())
    // .on('error', noop)
    .pipe($.jscsStylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.ngAnnotate())
    .pipe($.remember('js'))
    .pipe($.concat(pkg.name + '.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe($.sourcemaps.init())
    .pipe($.uglify({
      compress: {
        negate_iife: false
      }
    }))
    .pipe($.rename(pkg.name + '.min.js'))
    .pipe($.sourcemaps.write('./'))
    .pipe($.size())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('less', ['clean'], function () {
  gulp.src(paths.less.main)
    .pipe($.cached('less'))
    .pipe($.progeny())
    .pipe($.less())
    .pipe($.rename(pkg.name + '.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe($.sourcemaps.init())
    .pipe($.minifyCSS())
    .pipe($.rename(pkg.name + '.min.css'))
    .pipe($.sourcemaps.write('./'))
    .pipe($.size())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', ['build'], function () {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.less.watch, ['less']);

  // Fire up connect server
});

gulp.task('build', ['js', 'less']);
gulp.task('default', ['build']);

function noop() { }