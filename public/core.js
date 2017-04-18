angular.module('userApp', ['appRoutes','Ang_RateAndReviewCtrl'])


.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
