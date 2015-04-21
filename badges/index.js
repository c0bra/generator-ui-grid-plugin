'use strict';

/*

  [![Travis](https://img.shields.io/travis/c0bra/ui-grid-plugin-skeleton.svg)](https://travis-ci.org/c0bra/ui-grid-plugin-skeleton)
  [![devDependencies](https://img.shields.io/david/dev/c0bra/ui-grid-plugin-skeleton.svg?style=flat)](https://david-dm.org/c0bra/ui-grid-plugin-skeleton#info=devDependencies)
  [![Coveralls](https://img.shields.io/coveralls/c0bra/ui-grid-plugin-skeleton.svg?style=flat)](https://coveralls.io/r/c0bra/ui-grid-plugin-skeleton)

*/

var _ = require('lodash');
var _s = require('underscore.string');
var chalk = require('chalk');
var fs = require('fs');
var generators = require('yeoman-generator');
var path = require('path');

var badgeTemplates = {
  includeTravis: '[![Travis](https://img.shields.io/travis/<%= repo %>.svg)](https://travis-ci.org/<%= repo %>)',
  includeDevDeps: '[![devDependencies](https://img.shields.io/david/dev/<%= repo %>.svg?style=flat)](https://david-dm.org/<%= repo %>#info=devDependencies)',
  includeCoveralls: '[![Coveralls](https://img.shields.io/coveralls/<%= repo %>.svg?style=flat)](https://coveralls.io/r/<%= repo %>)',
};

module.exports = generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');

    if (!this.pkg.repository || !this.pkg.repository.url) {
      var err = 'No repository url found in your package.json'
      this.log.error(err);
      this.env.error();
      return;
    }

    this.repo = this.pkg.repository.url.match(/github.com\/(.+?)(\.git|$)/)[1];
  },

  prompting: function () {
    var done = this.async();

    this.prompt({
      type: 'checkbox',
      name: 'badges',
      message: 'Select Your Badges',
      choices: [
        {
          name: 'Travis',
          value: 'includeTravis',
          checked: true,
        },
        {
          name: 'DevDeps',
          value: 'includeDevDeps',
          checked: true,
        },
        {
          name: 'Coveralls',
          value: 'includeCoveralls',
          checked: true,
        }
      ]
    },

    function (answers) {
      var self = this;

      var hasBadge = function (feat) {
        return answers.badges.indexOf(feat) !== -1;
      };

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      ['includeTravis', 'includeDevDeps', 'includeCoveralls'].forEach(function (f) {
        self[f] = hasBadge(f);
      })
      // this.includeTravis = hasFeature('includeTravis');
      // this.includeDevDeps = hasFeature('includeDevDeps');
      // this.includeCoveralls = hasFeature('includeCoveralls');

      done();
    }.bind(this));
  },

  writing: function () {
    var self = this;

    // Update README.md
    var readmePath = this.destinationPath('README.md');

    if (!fs.existsSync(readmePath)) {
      this.log.error('You don\'t have a README.md file in your project directory');
      this.env.error();
      return;
    }

    var text = fs.readFileSync(readmePath, 'utf-8');

    // Compose the template
    var template = _.map(['includeTravis', 'includeDevDeps', 'includeCoveralls'], function (f) {
      if (self[f]) {
        return badgeTemplates[f];
      }
    }).join(' ');

    var badges = _.template(template)({ repo: self.repo });
    var output = badges + '\n\n' + text;

    fs.writeFileSync(readmePath, output);
  },

  end: function () {
    this.log('Done! The badges have been put at the top of your README.md. You can copy+paste them wherever you want')
  }

});
