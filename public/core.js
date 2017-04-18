angular.module('userApp', ['appRoutes', 'userControllers'])


.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);