// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', [
	'controllers',
	'ui.router'
])
// Configuración de las rutas
angularRoutingApp.config(function($stateProvider) {
	// Now set up the states
	$stateProvider
		.state('index', {
			url: "",
			views: {
				"header": {
					controller: 'HeaderController',
					templateUrl: 'header.html'
				},
				"content": {
					controller: 'EditorController',
					templateUrl: 'editor.html'
				}
			}
		})
		.state('about', {
			url: "/about",
			views: {
				"header": {
					controller: 'HeaderController',
					templateUrl: 'header.html'
				},
				"content": {
					controller: 'AboutController',
					templateUrl: 'about.html'
				}
			}
		})
});

var angularRoutingApp = angular.module('controllers', [
	'ngResource',
	'feeds'
])

.constant('DOMAIN_URL', window.domainUrl)

.factory('AuthService', function($resource, DOMAIN_URL) {
  var currentUser = $resource(DOMAIN_URL + 'me/', null, {});
  return currentUser;
})

.factory('ArticlesService', function($resource, DOMAIN_URL) {
  var articlesSrvc = $resource(DOMAIN_URL + 'articles/:id/', null, {
  	'get':  {method:'GET', isArray:true},
  	'update':  {method:'PUT'}
  });
  return articlesSrvc;
})

.controller('EditorController', function($scope, $http, DOMAIN_URL) {
	$scope.textAreaModel = '[Paste here your Original HTML code....]';
})

.controller('HeaderController', function($scope, $rootScope, AuthService, ArticlesService, DOMAIN_URL) {
	$scope.domain = DOMAIN_URL;
	$scope.message = 'Who we are';
	$scope.user = AuthService.get();
	$rootScope.alert = {
		class: 'alert-success',
		message: 'Done'
	};
	if($scope.user) $scope.articles = ArticlesService.get();
	console.log($scope.user);
})

.controller('AboutController', function($scope, $http, AuthService, ArticlesService, DOMAIN_URL) {
	$scope.domain = DOMAIN_URL;
	$scope.message = 'Who we are';
});
