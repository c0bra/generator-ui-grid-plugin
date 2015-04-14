
try {
  angular.module('constants')
}
catch (e) {
  angular.module('constants', []);
}

angular.module('constants')
.constant('PAGES', {
  "tutorial": {
    "pages": [
      {
        "name": "Start",
        "path": "Tutorial",
        "area": "tutorial",
        "docType": "content"
      }
    ],
    "name": "Tutorial"
  },
  "api": {
    "pages": [
      {
        "name": "ExamplePluginService",
        "path": "api/ui.grid.examplePlugin/service/ExamplePluginService",
        "area": "api",
        "codeName": "service",
        "module": "ui.grid.examplePlugin",
        "docType": "service"
      },
      {
        "name": "delayUppercase",
        "path": "api/js/function/delayUppercase",
        "area": "api",
        "codeName": "uppercase",
        "module": "js",
        "docType": "function"
      },
      {
        "name": "exampleDirective",
        "path": "api/ui.grid.examplePlugin/directive/exampleDirective",
        "area": "api",
        "codeName": "directive",
        "module": "ui.grid.examplePlugin",
        "docType": "directive"
      }
    ],
    "name": "API"
  }
});