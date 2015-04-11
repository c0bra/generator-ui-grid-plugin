
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
  "date": "2015-04-11 17:23:34 -0500",
  "commit": "a46eea7d510f6482749ae6a5eeb6383205be4aa5"
});