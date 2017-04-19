angular.module('appRoutes', ['ngRoute'])


.config(['$routeProvider',function($routeProvider) {

    $routeProvider

        .when('/', {
        templateUrl: 'partials/home.html'
    })

    .when('/about', {
        templateUrl: 'partials/about.html'
    })

    .when('/Rate_Review_Business/:business', {
        templateUrl: function (urlattr){console.log(urlattr.business);return 'partials/RateAndReview/RateAndReviewBusiness.html';},
        controller:'RateAndReviewBusinessCtrl'
    })
    .when('/Rate_Review_Business/:business/:service', {
        templateUrl: function (urlattr){console.log(urlattr.business);return 'partials/RateAndReview/RateAndReviewService.html';},
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
}]);
