/**
 * Configuration module for the app
 * @module configuration
 */
angular.module('config', [])
.constant('DOMAIN_URL', window.domainUrl);

/**
 * Controller module for the about
 * @module controllers/about
 */
angular.module('controllers.about', [
	'config'
])
.controller('AboutController', ["$scope", "$http", "DOMAIN_URL", function($scope, $http, DOMAIN_URL) {
	$scope.domain = DOMAIN_URL;
	$scope.message = 'Who we are';
}]);
/**
 * Controller module for the content
 * @module controllers/content
 */

angular.module('controllers.content', [
	'config'
])
.controller('ContentController', ["$scope", "$http", "DOMAIN_URL", function($scope, $http, DOMAIN_URL) {
	$scope.domain = DOMAIN_URL;
	$scope.message = 'Who we are';
}]);
/**
 * Controller module for the header
 * @module controllers/header
 */

angular.module('controllers.header', [
	'config',
	'services.auth',
	'services.article'
])
.controller('HeaderController', ["$scope", "$rootScope", "AuthService", "ArticlesService", "DOMAIN_URL", function($scope, $rootScope, AuthService, ArticlesService, DOMAIN_URL) {
	$scope.domain = DOMAIN_URL;
	$scope.message = 'Who we are';
	$scope.user = AuthService.get();
	$rootScope.test = 'test';
}]);
// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', [
	'config',
	'services.article',
	'services.auth',
	'controllers.about',
	'controllers.header',
	'controllers.content',
	'ui.router'
])
// Configuración de las rutas
angularRoutingApp.config(["$stateProvider", function($stateProvider) {
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
					controller: 'ContentController',
					templateUrl: 'content.html'
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
}]);

/**
 * Service module for the article
 * @module services/article
 */

angular.module('services.article', [
	'config',
	'ngResource'
])
.factory('ArticlesService', ["$resource", "DOMAIN_URL", function($resource, DOMAIN_URL) {
  var articlesSrvc = $resource(DOMAIN_URL + 'articles/:id/', null, {
  	'get':  {method:'GET', isArray:true},
  	'update':  {method:'PUT'}
  });
  return articlesSrvc;
}]);
/**
 * Service module for the auth
 * @module services/auth
 */

angular.module('services.auth', [
	'config',
	'ngResource'
])
.factory('AuthService', ["$resource", "DOMAIN_URL", function($resource, DOMAIN_URL) {
  var currentUser = $resource(DOMAIN_URL + 'me/', null, {});
  return currentUser;
}]);