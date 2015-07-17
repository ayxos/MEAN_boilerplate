/**
 * Controller module for the header
 * @module controllers/header
 */

angular.module('controllers.header', [
	'config',
	'services.auth',
	'services.article'
])
.controller('HeaderController', function($scope, $rootScope, AuthService, ArticlesService, DOMAIN_URL) {
	$scope.domain = DOMAIN_URL;
	$scope.message = 'Who we are';
	$scope.user = AuthService.get();
	$rootScope.test = 'test';
});