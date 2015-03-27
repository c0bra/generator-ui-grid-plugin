/* jshint camelcase: false */
'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var Dgeni = require('dgeni');
var merge = require('merge-stream');
var buildConfig = require('./config/build.config.js');

// Load any extra tasks
require('./lib/gulp');

function noop() {}

var paths = {
  clean: ['dist', '.tmp'],
  js: ['src/js/**/*.js'], // '.tmp/templates/templates.js'],
  test: ['test/*.spec.js'],
  less: {
    main: 'src/less/main.less',
    watch: ['src/less/**/*.less']
  },
  templates: 'src/template/**/*.html',

  // Directories for compiled, distributed files
  dist: {
    js: 'dist/js',
    css: 'dist/css'
  },

  // Locations for temporary files to use while building
  tmp: {
    docs: '.tmp/docs',
    templates: '.tmp/templates'
  }
};

// Load plugins
var $g = require('gulp-load-plugins')();

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

function templates() {
  return gulp.src(paths.templates)
    .pipe($g.cached('templates'))
    .pipe($g.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($g.remember('templates'))
    .pipe($g.ngHtml2js({
      moduleName: buildConfig.moduleName,
      prefix: buildConfig.moduleName
    }))
    .pipe($g.concat('templates.js'));
}
gulp.task('templates', function () {
  return templates()
    .pipe(
      gulp.dest(paths.tmp.templates)
    );
});

// TODO: need progeny() here for after templates change?
gulp.task('js',  function () {
  var js = gulp.src(paths.js)
    .pipe($g.cached('js'))
    .pipe($g.jshint())
    // .pipe($g.jshint.reporter('fail'))
    .pipe($g.jscs())
    .on('error', noop)
    .pipe($g.jscsStylish.combineWithHintResults())
    .pipe($g.jshint.reporter('jshint-stylish'))
    .pipe($g.ngAnnotate());

  return merge(js, templates())
    .pipe($g.remember('js'))

    // Re-order files so templates come last.
    //   They will fail to find the module if they're first
    .pipe($g.order([
      'src/js/**/*.js',
      'src/template/**/*.js'
    ], { base: '.' }))
    
    .pipe($g.concat(buildConfig.name + '.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe($g.sourcemaps.init())
    .pipe($g.uglify({
      compress: {
        negate_iife: false
      }
    }))
    .pipe($g.rename(buildConfig.name + '.min.js'))
    .pipe($g.sourcemaps.write('./'))
    .pipe($g.size({ title: 'js' }))
    .pipe(
      gulp.dest(paths.dist.js)
    );
});

gulp.task('less', function () {
  // Process the less files
  return gulp.src(paths.less.main)
    .pipe($g.cached('less'))
    .pipe($g.progeny())
    .pipe($g.less())
    .pipe($g.autoprefixer())
    .pipe($g.rename(buildConfig.name + '.css'))
    .pipe(
      gulp.dest(paths.dist.css)
    )

    // Minify
    .pipe($g.sourcemaps.init())
    .pipe($g.minifyCss())
    .pipe($g.rename(buildConfig.name + '.min.css'))
    .pipe($g.sourcemaps.write('./'))
    .pipe($g.size({ title: 'css' }))
    .pipe(
      gulp.dest(paths.dist.css)
    );
});

gulp.task('docs', function (cb) {
  (new Dgeni());
  // var dgeni = new Dgeni([require('./docs/config')]);
  // dgeni.generate().then(cb);
  cb();
});


/*-- Build and watch tasks --*/

gulp.task('watch', ['build', 'auto-reload-gulp'], function () {
  gulp.watch(paths.templates, ['js', 'docs']);
  gulp.watch(paths.js, ['js', 'docs']);
  gulp.watch(paths.less.watch, ['less']);

  // Fire up connect server
});

gulp.task('build', function (cb) {
  runSequence(
    'clean',
    'gulpfile',
    ['less', 'js', 'docs'],
    cb
  );
});

gulp.task('default', ['build']);
