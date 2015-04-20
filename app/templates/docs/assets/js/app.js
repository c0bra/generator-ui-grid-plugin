(function () {

var DocsApp = angular.module('DocsApp',
  [
    'ngRoute',
    'ui.bootstrap',
    'constants',
    'plnkr'
  ]
)

// .config(['$locationProvider', function($locationProvider) {
//   $locationProvider.html5Mode(true).hashPrefix('!');
// }])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', { redirectTo: '/doc/Tutorial' })
    .when('/doc/:path*', {
      controller: 'PageCtrl as vm',
      templateUrl: function(urlattr) {
        return 'partials/' + urlattr.path + '.html';
      },
      resolve: {
        $route: ['$route', function ($route) {
          return $route;
        }]
      }
    })
    .otherwise('/doc/Tutorial');
}])

.run(['$rootScope', function ($rootScope) {
  // Re-highlight code blocks on route change
  $rootScope.$on('$routeChangeSuccess', function () {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
}])

.controller('DocsCtrl', DocsCtrl)
.controller('PageCtrl', PageCtrl)
.filter('orderObjectBy', orderObjectBy)
.directive('code', function () {
  return function ($scope, $elm, $attr) {
    hljs.highlightBlock($elm[0]);
  }
})
;

DocsCtrl.$inject = ['$route', 'PAGES'];
function DocsCtrl($route, PAGES) {
  var vm = this;

  vm.PAGES = PAGES;
  vm.linkClass = linkClass;

  ////////////

  function linkClass(doc) {
    if (!$route.current) { return; }

    var path = doc.path.replace(/\.\//, '');
    
    if ($route.current.params.path === path) { return 'active'; }
  };
}

PageCtrl.$inject = ['openPlunkr'];
function PageCtrl(openPlunkr) {
  var vm = this;

  vm.openPlunkr = openPlunkr;
}

function orderObjectBy() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
}

})();