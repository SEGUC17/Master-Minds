angular.module('Ang_Homepage', [])
.controller('HomepageController', function($scope, $http, $location){
    $http.get('/routes/viewbusiness').then(function(res){
        $scope.businesses = res.data.content;
        console.log(res.data.content);
    });
});