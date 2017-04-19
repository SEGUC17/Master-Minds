angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider

        .when('/', {
        templateUrl: 'partials/home.html'
    })

    .when('/about', {
        templateUrl: 'partials/about.html'
    })

    .when('/Rate_Review_Business', {
        templateUrl: 'partials/RateAndReview/RateAndReviewBusiness.html',
        controller:'RateAndReviewBusinessCtrl'
    })


    .when('/register', {
        templateUrl: 'partials/users/register.html',
        controller: 'regCtrl'
    })

    .when('/detailedService', {
        templateUrl: 'partials/serviceView.html',
        controller: 'serviceController'
    })

    .otherwise({ redirectTo: '/' });
});
