

var userApp = angular.module('userApp', ['appRoutes','Ang_RateAndReviewCtrl','userControllers','serviceControllers','Ang_Homepage','Ang_Client_profile','adminApp','NavigationBar','subeditCtrl','Ang_viewbusiness','Ang_view_rateandreview']);



userApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
