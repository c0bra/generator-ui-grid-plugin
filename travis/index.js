'use strict';

var _ = require('lodash');
var fs = require('fs');
var generators = require('yeoman-generator');
var path = require('path');
var yaml = require('yamljs');

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
    var filepath = this.destinationPath('.travis.yml');

    if (!fs.existsSync(filepath)) {
      this.log.error('You don\'t have a .travis.yml file in your project directory');
      this.env.error();
      return;
    }

    var raw = fs.readFileSync(filepath, 'utf-8');

    // Convert the YAML text to json
    var obj = yaml.parse(raw);

    // Put our secure variable in the env.global space, but don't overwrite anything already there
    if (obj.env && obj.env.global) {
      obj.env.global.push({ secure: this.githubToken });
    }
    else {
      obj = _.assign(obj, { env: { global: [{ secure: this.githubToken }] } });
    }

    // Convery json to YAML
    var out = yaml.stringify(obj, 4, 2);

    // Add an empty spacer line between sections
    out = out.replace(/^(\S)/gm, '\n$1');

    fs.writeFileSync(filepath, out);
  },

  end: function () {
    this.log('Done! You now have you github token ready to use on Travis.');
  }

});
