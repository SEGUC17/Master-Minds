angular.module('adminApp', [])

.controller('adminController', function($scope, $http,$location,$timeout,$route) {
            //$scope.loading = true;
    $scope.isAdmin = false;
            //console.log("login form submitted");
    $http.get('/routes/admin/viewReports').then(function(res) {
        if (res.data.result == "success") {
            $scope.isAdmin = true;
            $scope.reviews = res.data.content;
        }else{
            $scope.reason=res.data.message;
        }
    });
    
    $scope.banUser = function(username){
        $http.put('/routes/admin/ban-user/'+username,{}).then(function(res) {
           // $timeout(function() {
           //     $route.reload();
           // }, 500);
           $scope.getUsers();
        });
    };
    $scope.banBus = function(username){
        $http.put('/routes/admin/ban-bus/'+username,{}).then(function(res) {
            //$timeout(function() {
            //    $route.reload();
            //}, 500);
            $scope.getBus();
        });
    };
    $scope.deleteReview = function(id){
        $http.put('/routes/admin/deleteReview/'+id,{}).then(function(res) {
            $timeout(function() {
                $route.reload();
            }, 500);
        });
    };
    $scope.deleteBus = function(username){
        $http.put('/routes/admin/deletebussines/'+username,{}).then(function(res) {
            $timeout(function() {
                $route.reload();
            }, 500);
        });
    };   
    $scope.getUsers = function(){
        $http.get('/routes/admin/getUsers').then(function(res) {
            if (res.data.result == "success") {
            $scope.userList = res.data.content;
            }
        });
    }
    $scope.getBus = function(){
        $http.get('/routes/admin/getBus').then(function(res) {
            if (res.data.result == "success") {
            $scope.busList = res.data.content;
            }
        });
    }
});