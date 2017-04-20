
angular.module('userApp', ['appRoutes','Ang_RateAndReviewCtrl','userControllers', 'Ang_Homepage'])



.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
