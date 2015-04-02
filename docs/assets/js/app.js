(function () {

var DocsApp = angular.module('DocsApp', ['ngRoute'])

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

DocsCtrl.$inject = ['PAGES'];
function DocsCtrl(PAGES) {
  var vm = this;

  vm.PAGES = PAGES;
}

PageCtrl.$inject = [];
function PageCtrl() {
  var vm = this;
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