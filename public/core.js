

angular.module('userApp', ['appRoutes','Ang_RateAndReviewCtrl','userControllers','serviceControllers','ang_homepage'])


.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
