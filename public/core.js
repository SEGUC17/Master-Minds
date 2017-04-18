
angular.module('userApp', ['appRoutes','Ang_RateAndReviewCtrl','userControllers'])



.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
