
angular.module('userApp', ['appRoutes','Ang_RateAndReviewCtrl','userControllers','serviceControllers'])



.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
