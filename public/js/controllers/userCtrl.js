angular.module('userControllers', [])

.controller('regCtrl', function($scope) {
    $scope.regUser = function() {
        console.log("testing new button");
    };
});