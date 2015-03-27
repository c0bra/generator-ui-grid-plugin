var pkg = require('../package.json');
var bower = require('../bower.json');
var fs = require('fs');

module.exports = {
  name: pkg.name,
  moduleName: 'ui.grid.plugin.skeleton',
  version: pkg.version,
  ngVersion: '1.3.15',
  // repository: pkg.repository.url
  //   .replace(/^git/, 'https')
  //   .replace(/(\.git)?\/?$/, '')
};