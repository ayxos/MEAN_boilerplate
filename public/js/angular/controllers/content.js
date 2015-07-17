/**
 * Controller module for the content
 * @module controllers/content
 */

angular.module('controllers.content', [
	'config'
])
.controller('ContentController', function($scope, $http, DOMAIN_URL) {
	$scope.domain = DOMAIN_URL;
	$scope.message = 'Who we are';
});