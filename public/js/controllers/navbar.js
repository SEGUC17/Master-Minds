angular.module('NavigationBar', [])
.controller('navigation', function($scope, $http, $location){
    $http.get('/routes/viewbusiness').then(function(res){
        $scope.businesses = res.data.content;
        console.log(res.data.content[0].business_name);
    });
});