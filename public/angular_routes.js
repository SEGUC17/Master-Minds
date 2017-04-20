angular.module('appRoutes', ['ngRoute'])


.config(['$routeProvider',function($routeProvider) {

    $routeProvider

        .when('/', {
        templateUrl: 'partials/Homepage/Homepage.html',
        controller: 'HomepageController'
    })

    .when('/about', {
        templateUrl: 'partials/about.html'
    })
    
    .when('/:business_name', {

    })

    .when('/Rate_Review_Business/:business_name', {
        templateUrl: function (urlattr){console.log(urlattr.business);return 'partials/RateAndReview/RateAndReviewBusiness.html';},
        controller:'RateAndReviewBusinessCtrl'
    })
    .when('/Rate_Review_Business/:business_name/:service', {
        templateUrl: function (urlattr){console.log(urlattr.business);return 'partials/RateAndReview/RateAndReviewService.html';},
        controller:'RateAndReviewBusinessCtrl'
    })

    .when('/register', {
        templateUrl: 'partials/users/register.html',
        controller: 'regCtrl'
    })

    .when('/detailedService/:business/:service', {
        templateUrl: function (urlattr){console.log(urlattr.business);return 'partials/serviceView.html';},
        controller: 'serviceController'
    })

    .otherwise({ redirectTo: '/' });
}]);
