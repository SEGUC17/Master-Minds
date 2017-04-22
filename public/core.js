

angular.module('userApp', ['appRoutes','Ang_RateAndReviewCtrl','userControllers','serviceControllers','Ang_Homepage','Ang_Client_profile','adminApp','NavigationBar','Ang_viewbusiness'])



.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
