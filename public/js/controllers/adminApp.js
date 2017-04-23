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
    $scope.onlyBanUser = function(username){
        $http.put('/routes/admin/only-ban-user/'+username,{}).then(function(res) {
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
    $scope.getUnaccepted = function(){
        $http.get('/routes/admin/view_unaccepted_businesses').then(function(res){
            if(res.data.result == "success"){
                $scope.unacceptedBusList = res.data.content;
            }
        });
    }
    $scope.acceptBus = function(business){
        //console.log("acceptBus has been reached!");
        //console.log(business);
        $http.put('/routes/admin/accept_application/'+business,{}).then(function(res){
                //console.log(business);
                $scope.getUnaccepted();
                $timeout(function() {
                $route.reload();
                }, 500);
        });
    }
    $scope.isAdminCheck = function(){
        $http.get('/routes/admin/isAdmin').then(function(res) {
            if(res.data.result == "success"){
                $scope.isAdmin = true;
            }
        });
    }
});