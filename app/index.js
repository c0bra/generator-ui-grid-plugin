'use strict';

var _s = require('underscore.string');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.prompt(
      [
        {
          type    : 'input',
          name    : 'name',
          message : 'Your plugin\'s name (e.g. "UI-Grid XML Importer"):',
          default : _s.titleize(this.appname) // Default to current folder name
        },
        {
          type: 'input',
          name: 'angularVersion',
          message: 'Angular Version',
          default: '1.3.15'
        },
        {
          type: 'input',
          name: 'googleAnalytics',
          message: 'Google Analytics Tracking Code (optional):',
          default: null
        }
      ],


      /*
        Prompts:

          angular module name
          readable name
          description
          author's name
          angular version
          GA key
          github username
          github password
      */

      function (answers) {
        // this.log(answers.name);

        // Process app name
        this.readableName = answers.name;
        this.slugName = _s.slugify(answers.name);
        this.moduleName = this.slugName.replace(/\-/g, '.');
        this.angularVersion = answers.angularVersion;
        this.googleAnalytics = answers.googleAnalytics;

        done();
      }.bind(this));
  },

  writing: {
    gulpfile: function () {
      this.template('gulpfile.js');
    },

    packageJSON: function () {
      this.template('_package.json', 'package.json');
    },

    bower: function () {
      this.template('bower.json', 'bower.json');
    },

    git: function () {
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    },

    jshint: function () {
      this.copy('jshintrc', '.jshintrc');
    },

    jscs: function () {
      this.copy('jscsrc', '.jscsrc');
    },

    editorConfig: function () {
      this.copy('editorconfig', '.editorconfig');
    },

    directories: function () {
      this.fs.copyTpl(
        this.templatePath('config/**'),
        this.destinationPath('config'),
        this
      );

      this.directory('docs', 'docs');
      this.directory('src', 'src');
      this.directory('test', 'test');
    }

    /*
      Other files
        README.md
        LICENSE (?)
        .travis.yml
        travis_build.sh
        build.config.js

        test/main.js <-- main test file, needs module name templatized in
        docs/content/Tutorial.md <-- needs readable name
    */
  },

  install: function () {
    // this.installDependencies();
  }
});
