/* jshint camelcase: false */
'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var Dgeni = require('dgeni');
var pkg = require('./package.json');

// Load any extra tasks
require('./lib/gulp');

var paths = {
  clean: 'dist',
  js: ['src/js/**/*.js'],
  test: ['test/*.spec.js'],
  less: {
    main: 'src/less/main.less',
    watch: ['src/less/**/*.less']
  },
  demo: ['src/demo/**/*.html'],

  // Locations for temporary files to use while developing
  tmp: {
    demo: '.tmp/demo'
  }
};

// Load plugins
var $g = require('gulp-load-plugins')({
  rename: {
    'gulp-minify-css': 'minifyCSS'
  }
});

// Clean
gulp.task('clean', function (cb) {
  del(paths.clean, cb);
});

// Check gulpfile with jshint
gulp.task('gulpfile', function () {
  return gulp.src('gulpfile.js')
    .pipe($g.jshint('.jshintrc'))
    .pipe($g.jshint.reporter('jshint-stylish'))
    .pipe($g.jshint.reporter('fail'));
});

gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe($g.cached('js'))
    .pipe($g.jshint())
    // .pipe($g.jshint.reporter('fail'))
    .pipe($g.jscs())
    // .on('error', noop)
    .pipe($g.jscsStylish.combineWithHintResults())
    .pipe($g.jshint.reporter('jshint-stylish'))
    .pipe($g.ngAnnotate())
    .pipe($g.remember('js'))
    .pipe($g.concat(pkg.name + '.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe($g.sourcemaps.init())
    .pipe($g.uglify({
      compress: {
        negate_iife: false
      }
    }))
    .pipe($g.rename(pkg.name + '.min.js'))
    .pipe($g.sourcemaps.write('./'))
    .pipe($g.size({ title: 'js' }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('less', function () {
  return gulp.src(paths.less.main)
    // .pipe($g.cached('less'))
    // .pipe($g.progeny())
    .pipe($g.less())
    .pipe($g.rename(pkg.name + '.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe($g.sourcemaps.init())
    .pipe($g.minifyCSS())
    .pipe($g.rename(pkg.name + '.min.css'))
    .pipe($g.sourcemaps.write('./'))
    .pipe($g.size({ title: 'css' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('docs', function (cb) {
  var dgeni = new Dgeni([require('./docs/config')]);
  dgeni.generate().then(cb);
});


/* Build and watch tasks */

gulp.task('watch', ['build', 'auto-reload-gulp'], function () {
  // gulp.watch('gulpfile.js', ['gulpfile']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.less.watch, ['less']);
  gulp.watch(paths.demo, ['demo']);

  // Fire up connect server
});

gulp.task('build', function (cb) {
  runSequence(
    'clean',
    'gulpfile',
    ['less', 'js', 'demo'],
    cb
  );
});

gulp.task('default', ['build']);

// function noop() { }