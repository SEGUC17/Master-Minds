angular.module('appRoutes', ['ngRoute'])


.config(['$routeProvider',function($routeProvider) {

    $routeProvider


    .when('/', {
        templateUrl: 'partials/Homepage/Homepage.html',
        controller: 'HomepageController'
    })

    .when('/client_profile', {
        templateUrl: 'partials/client_profile.html',
        controller: 'ClientprofileCtrl'
    })

    .when('/Rate_Review_Business/:business_name', {
        templateUrl: function (urlattr){return 'partials/RateAndReview/RateAndReviewBusiness.html';},
        controller:'RateAndReviewBusinessCtrl'
    })
    .when('/Rate_Review_Business/:business_name/:service_name', {
        templateUrl: function (urlattr){return 'partials/RateAndReview/RateAndReviewService.html';},
        controller:'RateAndReviewBusinessCtrl'
    })

    .when('/register', {
        templateUrl: 'partials/users/register.html',
        controller: 'regCtrl'
    })

    .when('/login', {
        templateUrl: 'partials/users/login.html',
        controller: 'loginCtrl'
    })


    .when('/detailedService/:business/:service', {
        templateUrl: function (urlattr){console.log(urlattr.business+" "+urlattr.service);return 'partials/Service/serviceView.html';},
        controller: 'serviceController'
    })

    .when('/admin-panel', {
        templateUrl: 'partials/admin-panel/admin-home.html',
        controller: 'adminController'
    })
    .when('/admin-panel/control-reviews', {
        templateUrl: 'partials/admin-panel/control-reviews.html',
        controller: 'adminController'
    })
    .when('/admin-panel/control-clients', {
        templateUrl: 'partials/admin-panel/control-clients.html',
        controller: 'adminController'
    })
    .when('/admin-panel/control-businesses', {
        templateUrl: 'partials/admin-panel/control-businesses.html',
        controller: 'adminController'
    })
    .otherwise({ redirectTo: '/' });
}]);
