angular.module('appRoutes', ['ngRoute'])


.config(['$routeProvider',function($routeProvider) {

    $routeProvider


    .when('/', {
        templateUrl: 'partials/Homepage/Homepage.html',
        controller: 'HomepageController'
    })// go to Homepage

    .when('/client_profile', {
        templateUrl: 'partials/client_profile.html',
        controller: 'ClientprofileCtrl'
    })//go to client profile who is logged in

    .when('/Rate_Review_Business/:business_name', {
        templateUrl: function (urlattr){return 'partials/RateAndReview/RateAndReviewBusiness.html';},
        controller:'RateAndReviewBusinessCtrl'
    })//you can add review and add rating to a business throught this link
    .when('/Rate_Review_Business/:business_name/:service_name', {
        templateUrl: function (urlattr){return 'partials/RateAndReview/RateAndReviewService.html';},
        controller:'RateAndReviewBusinessCtrl'
    })//you can add review and add rating throught this link

    .when('/register', {
        templateUrl: 'partials/users/register.html',
        controller: 'regCtrl'
    })//this will go to register page

    .when('/login', {
        templateUrl: 'partials/users/login.html',
        controller: 'loginCtrl'
    })//this will go to login page
    .when('/getrateandreview/:business', {
        templateUrl: function (urlattr){ return 'partials/RateAndReview/ViewRateAndReviewBusiness.html'},
        controller: 'ViewRateAndReviewCtrl'
    })// this will go the rates and reviews page of the business


    .when('/subscribe', {
        templateUrl: 'partials/businessowner/subscribe.html',
        controller: 'subCtrl'
    })//this where businessowner can subscribe to add his service in our site

    .when('/editboprofile', {
        templateUrl: 'partials/businessowner/editboprofile.html',
        controller: 'editbopCtrl'
    })//this where businessowner can change his profile to add his service in our site

    .when('/editprofile', {
        templateUrl: 'partials/editclientprofile.html',
        controller: 'editClientCtrl'
    })//this where the user can edit his profile

    .when('/detailedService/:business/:service', {
        templateUrl: function (urlattr){console.log(urlattr.business+" "+urlattr.service);return 'partials/Service/serviceView.html';},
        controller: 'serviceController'
    })
    .when('/client_profile/:username', {
        templateUrl: function (urlattr){ return 'partials/admin_client_profile.html';},
        controller: 'AdminClientprofileCtrl'
    })//this can be accessed only by the admin it goes to client_profile  to see if he should ban him or not

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
    .when('/admin-panel/control-applications', {
        templateUrl: 'partials/admin-panel/control-applications.html',
        controller: 'adminController'
    })

       .when('/business/:business_name', {
        templateUrl: 'partials/viewbusiness.html',
        controller: 'ViewBusinessCtrl'
        })
    .otherwise({ redirectTo: '/' });
}]);
