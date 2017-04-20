angular.module('adminApp', [])

.controller('adminController', function($scope, $http,$location,$timeout) {
            //$scope.loading = true;
        //$scope.errorMsg = false;
            //console.log("login form submitted");
    $http.get('/routes/admin/viewReports').then(function(res) {
        if (res.data.result == "success") {
                    //$scope.loading = false;
        $scope.reviews = res.data.content;
                    //$timeout(function() {
                    //    $location.path('#/');
                    //}, 2000);
        } else {
                    //$scope.loading = false;
            //$scope.errorMsg = res.data.message;
        }
    });
    
    $scope.banUser = function(username){
        $http.put('/routes/admin/ban-user/'+username,{}).then(function(res) {
        });
    };
    $scope.deleteReview = function(id){
        $http.put('/routes/admin/deleteReview/'+id,{}).then(function(res) {
            console.log(res.data);
            $timeout(function() {
                $location.path('#/admin-panel/control-reviews');
            }, 500);
        });
    };
});