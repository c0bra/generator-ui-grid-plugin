'use strict';

/*

  [![Travis](https://img.shields.io/travis/c0bra/ui-grid-plugin-skeleton.svg)](https://travis-ci.org/c0bra/ui-grid-plugin-skeleton)
  [![devDependencies](https://img.shields.io/david/dev/c0bra/ui-grid-plugin-skeleton.svg?style=flat)](https://david-dm.org/c0bra/ui-grid-plugin-skeleton#info=devDependencies)
  [![Coveralls](https://img.shields.io/coveralls/c0bra/ui-grid-plugin-skeleton.svg?style=flat)](https://coveralls.io/r/c0bra/ui-grid-plugin-skeleton)

*/


var chalk = require('chalk');
var _s = require('underscore.string');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');

    if (!this.pkg.repo || !this.pkg.repo.url) {
      this.log.error('No repository url found in your package.json');
    }
  },

  prompting: function () {
    var done this.async();

    this.prompt(
      {
        type: 'input',
        name: 'githubToken',
        message: 'Github Token (it\'s stored encrypted)'
      },

      function (answers) {
        // Process app name
        this.githubToken = answers.githubToken;

        done();
      }.bind(this));
  },

  writing: function () {

  },

});
