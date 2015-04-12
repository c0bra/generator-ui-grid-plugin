/* jshint camelcase: false */
'use strict';

/** npm dependencies */
var argv = require('yargs')
    .default('port', 4000)
    .default('tag', null)
    .argv;
var child_process = require('child_process');
var del = require('del');
var Dgeni = require('dgeni');
var karma = require('karma').server;
var merge = require('merge-stream');
var path = require('path');
var runSequence = require('run-sequence');

/** Gulp dependencies */
var gulp = require('gulp');
var $g = require('gulp-load-plugins')();

/** Local dependencies */
require('./lib/gulp');
var buildConfig = require('./config/build.config.js');
function noop() {}

/** Arguments */
var VERSION = argv.version || buildConfig.version;

/** Build configuration */
var config = {
  banner: ['/*!',
    ' * ' + buildConfig.name,
    ' * ' + buildConfig.repository,
    ' * @license MIT',
    ' * v' + VERSION,
    ' * ' + (new Date()).toISOString(),
    ' */',
    ''].join('\n'),
  paths: {
    clean: ['dist', '.tmp'],
    js: ['src/js/**/*.js'], // '.tmp/templates/templates.js'],
    test: ['test/*.spec.js'],
    less: {
      main: 'src/less/main.less',
      watch: ['src/less/**/*.less']
    },
    templates: 'src/template/**/*.html',
    docs: 'docs/assets/**/*',
    docs_watch: 'docs/**',

    // Directories for compiled, distributed files
    dist: {
      js: 'dist/js',
      css: 'dist/css'
    },

    // Locations for temporary files to use while building
    tmp: {
      docs: '.tmp/docs',
      e2e: ['.tmp/docs/ptore2e/**/*.js', '.tmp/docs/examples/**/*.js'],
      templates: '.tmp/templates'
    }
  }
};


/** Gulp tasks */

// Clean
gulp.task('clean', function (cb) {
  del(config.paths.clean, cb);
});

// Check gulpfile with jshint
gulp.task('gulpfile', function () {
  return gulp.src('gulpfile.js')
    // TODO: this is too strict
    // .pipe($g.jshint('.jshintrc'))
    // .pipe($g.jshint.reporter('jshint-stylish'))
    // .pipe($g.jshint.reporter('fail'));
});

function templates() {
  return gulp.src(config.paths.templates)
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
      gulp.dest(config.paths.tmp.templates)
    );
});

// TODO: need progeny() here for after templates change?
gulp.task('js',  function () {
  var js = gulp.src(config.paths.js)
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
    .pipe($g.header(config.banner))
    .pipe(gulp.dest('dist/js'))
    .pipe($g.sourcemaps.init())
    .pipe($g.uglify({
      compress: {
        negate_iife: false
      }
    }))
    .pipe($g.rename(buildConfig.name + '.min.js'))
    .pipe($g.header(config.banner))
    .pipe($g.sourcemaps.write('./'))
    .pipe($g.size({ title: 'js' }))
    .pipe(
      gulp.dest(config.paths.dist.js)
    )
    .pipe($g.connect.reload());
});

gulp.task('less', function () {
  // Process the less files
  return gulp.src(config.paths.less.main)
    .pipe($g.cached('less'))
    .pipe($g.progeny())
    .pipe($g.less())
    .pipe($g.autoprefixer())
    .pipe($g.rename(buildConfig.name + '.css'))
    .pipe($g.header(config.banner))
    .pipe(
      gulp.dest(config.paths.dist.css)
    )

    // Minify
    .pipe($g.sourcemaps.init())
    .pipe($g.minifyCss())
    .pipe($g.rename(buildConfig.name + '.min.css'))
    .pipe($g.sourcemaps.write('./'))
    .pipe($g.size({ title: 'css' }))
    .pipe(
      gulp.dest(config.paths.dist.css)
    )
    .pipe($g.connect.reload());
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/config/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('webdriver_update', $g.protractor.webdriver_update);

gulp.task('webdriver_standalone', ['webdriver_update'], function (cb) {
  var child = child_process.spawn(path.normalize('./node_modules/.bin/webdriver-manager.cmd'), ['start'], {
    stdio: 'pipe'
  });

  child.once('close', cb);
  child.on('error', cb);

  child.stderr.on('data', function(data) {
    var sentinal = 'Started org.openqa.jetty.jetty.Server'
    if (data.toString().indexOf(sentinal) != -1) {
      cb(null, child)
    }
  });
  // child.stdout.on('data', function(data) {
  //   var sentinal = 'Started org.openqa.jetty.jetty.Server'
  //   if (data.toString().indexOf(sentinal) != -1) {
  //     cb(null, child)
  //   }
  // });
});

gulp.task('connect', function () {
  return $g.connect.server({
    root: ['.tmp/docs', '.'],
    port: 8000
  });
});

gulp.task('protractor', ['webdriver_standalone', 'connect'], function () {
  return gulp.src(config.paths.tmp.e2e)
    .pipe($g.protractor.protractor({
      configFile: 'config/protractor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) { throw e });
});

gulp.task('docs', function () {
  gulp.src(config.paths.docs, { base: 'docs/assets' })
    .pipe(gulp.dest(config.paths.tmp.docs))
    .pipe($g.connect.reload());

  var dgeni = new Dgeni([require('./docs/config')]);
  dgeni.generate()
    .then($g.connect.reload);
});


/*-- Build and watch tasks --*/

gulp.task('watch', ['build'], function (done) { // TODO?: 'auto-reload-gulp'
  gulp.watch(config.paths.templates, ['js', 'docs']);
  gulp.watch(config.paths.js, ['js', 'docs']);
  gulp.watch(config.paths.docs_watch, ['docs']);
  gulp.watch(config.paths.less.watch, ['less']);

  // Start karma
  karma.start({
    singleRun:false,
    autoWatch:true,
    configFile: __dirname + '/config/karma.conf.js',
    browsers : argv.browsers ? argv.browsers.trim().split(',') : ['PhantomJS'],
  }, done);

  // Fire up connect server
  $g.connect.server({
    root: ['.tmp/docs', '.'],
    port: argv.port,
    livereload: true
  });
});

gulp.task('build', function (cb) {
  runSequence(
    'clean',
    'gulpfile',
    ['less', 'js', 'docs'],
    cb
  );
});

gulp.task('pre-publish', ['build'], function (cb) {  
  var pub = merge(
    gulp.src('dist/**', { base: '.' }),
    gulp.src('.tmp/docs/**', { base: '.tmp/docs' }),
    gulp.src('bower_components/**', { base: '.' })
  )
    .pipe(gulp.dest('.tmp/publish'));

  var bower = gulp.src('bower.json')
    .pipe($g.jsonTransform(function(data) {
      return {
        name: data.name,
        version: data.version,
        authors: data.authors,
        description: data.description,
        keywords: data.keywords,
        license: data.license,
        dependencies: data.dependencies
      };
    }, 2))
    .pipe(gulp.dest('.tmp/publish'));

  return merge(pub, bower);
});

gulp.task('publish', ['pre-publish'], function (cb) {
  var ghpages = require('gh-pages');

  ghpages.publish(path.join(__dirname, '.tmp/publish'), {
    tag: argv.tag ? argv.tag : null
  }, cb);
});

gulp.task('default', ['build']);
