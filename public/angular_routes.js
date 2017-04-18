angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider

        .when('/', {
        templateUrl: 'partials/home.html'
    })

    .when('/about', {
        templateUrl: 'partials/about.html'
    })

    .when('/register', {
        templateUrl: 'partials/users/register.html',
        controller: 'regCtrl'
    })

    .otherwise({ redirectTo: '/' });
});