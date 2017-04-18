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
      .otherwise({ redirectTo: '/' });
});
