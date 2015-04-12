
try {
  angular.module('constants')
}
catch (e) {
  angular.module('constants', []);
}

angular.module('constants')
.constant('BUILDCONFIG', {
  "name": "ui-grid-plugin-skeleton",
  "moduleName": "ui.grid.plugin.skeleton",
  "readableName": "UI-Grid Plugin Skeleton",
  "version": "0.0.0",
  "ngVersion": "1.3.15",
  "repository": null,
  "date": "2015-04-11 17:57:20 -0500",
  "commit": "fbc53abf53754c04df0ba46447f27eb5b20d10d6"
});