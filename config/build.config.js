var pkg = require('../package.json');
var bower = require('../bower.json');
var fs = require('fs');

module.exports = {
  // Name that will be used in angular.module
  moduleName: 'ui.grid.plugin.skeleton',

  // Name that will show up in text
  readableName: 'UI-Grid Plugin Skeleton',

  // Angular verison to use
  ngVersion: '1.3.15',

  // Your google analytics id, if you have one and want it on this site
  googleAnalytics: null,

  pkg: pkg,
  name: pkg.name,
  version: pkg.version,
  repository: (pkg.repository && pkg.repository.url) ? pkg.repository.url
    .replace(/^git/, 'https')
    .replace(/(\.git)?\/?$/, '')
    : null,
};
