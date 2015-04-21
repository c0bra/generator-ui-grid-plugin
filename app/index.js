'use strict';

var chalk = require('chalk');
var _s = require('underscore.string');
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay('Create your own ' + chalk.green('UI-Grid Plugin') + '!'));

    this.prompt(
      [
        {
          type    : 'input',
          name    : 'name',
          message : 'Your plugin\'s name (e.g. "UI-Grid XML Importer"):',
          default : gridNamize(this.appname) // Default to current folder name
        },
        {
          type: 'input',
          name: 'description',
          message: 'Description of your plugin'
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

          plugin name
          description
          author's name?
          GA key (optional)
      */

      function (answers) {
        // this.log(answers.name);

        // Process app name
        this.readableName = answers.name;
        this.slugName = _s.slugify(answers.name);
        this.moduleName = this.slugName.replace(/\-/g, '.');
        this.description = answers.description;
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
    },

    readme: function () {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        this
      );
    },

    travis: function () {
      this.fs.copy(
        this.templatePath('travis_build.sh'),
        this.destinationPath('travis_build.sh')
      );

      this.fs.copyTpl(
        this.templatePath('.travis.yml'),
        this.destinationPath('.travis.yml')
      );
    }

    /*
      Other files
        .travis.yml
    */
  },

  install: function () {
    // TODO: turn back on
    // this.installDependencies();
  }
});

// Turn any form of ui-grid, ui.grid, uigrid, UI Grid, etc., into "UI-Grid"
function gridNamize(input) {
  var title = _s.titleize(input);

  return title.replace(/ui.?grid/i, 'UI-Grid');
}
