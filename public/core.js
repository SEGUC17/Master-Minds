

var userApp = angular.module('userApp', ['appRoutes','Ang_RateAndReviewCtrl','userControllers','serviceControllers','Ang_Homepage','Ang_Client_profile','adminApp','NavigationBar','subeditCtrl','boserviceCtrl']);



userApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
