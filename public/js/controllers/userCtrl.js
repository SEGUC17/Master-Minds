var app = angular.module('userControllers', []);

app.controller('regCtrl', function ($scope, $http, $location, $timeout) {
    $scope.regUser = function (regData, isValid) {
        if (isValid) {
            $scope.loading = true;
            $scope.errorMsg = false;
            console.log("form submitted");
            $http.post('/routes/register', $scope.regData).then(function (res) {
                if (res.data.result == "success") {
                    $scope.loading = false;
                    $scope.successMsg = res.data.message + '....Redirecting to the homepage';
                    $timeout(function () {
                        $location.path('#/');
                    }, 2000);

                } else {
                    $scope.loading = false;
                    $scope.errorMsg = res.data.message;
                }
            });
        }
    };
});

app.controller('loginCtrl', function ($scope, $http, $location, $timeout, $route, $document, $window) {
    $scope.logUser = function (logData, isValid) {
        if (isValid) {
            $scope.loading = true;
            $scope.errorMsg = false;
            console.log("login form submitted");
            $http.post('/routes/login', $scope.logData).then(function (res) {
                if (res.data.result == "success") {
                    $scope.loading = false;
                    $scope.successMsg = res.data.message + '......Redirecting to the homepage';
                    $timeout(function () {
                        $location.path('#/');
                        $window.location.reload();
                    }, 2000);
                } else {
                    $scope.loading = false;
                    $scope.errorMsg = res.data.message;
                }
            });
        }
    };
});
// app.controller('logoutCtrl',function($scope,$http){
//     $scope.logout = function(){
//         $http.post('/routes/logout').then(function(res){
//             if(res.data.result == "success")
//             {
//                 $scope.username = null;
//                     $scope.type = null;
//             }
//         });
//     }
// });