var pkg = require('../package.json');
var bower = require('../bower.json');
var fs = require('fs');

module.exports = {
  pkg: pkg,
  name: pkg.name,
  moduleName: 'ui.grid.plugin.skeleton',
  readableName: 'UI-Grid Plugin Skeleton',
  version: pkg.version,
  ngVersion: '1.3.15',
  repository: (pkg.repository && pkg.repository.url) ? pkg.repository.url
    .replace(/^git/, 'https')
    .replace(/(\.git)?\/?$/, '')
    : null
};
