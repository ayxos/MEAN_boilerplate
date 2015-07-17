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
});
