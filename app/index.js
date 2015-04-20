'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.prompt(
      {
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : this.appname // Default to current folder name
      },

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
        this.log(answers.name);
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

    /*
      Other files
        README.md
        LICENSE (?)
        .travis.yml
        travis_build.sh
    */
  }

  // install: function () {
  //   this.installDependencies();
  // }
});
