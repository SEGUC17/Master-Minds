angular.module('userControllers', [])

.controller('regCtrl', function($scope, $http, $location, $timeout) {
    $scope.regUser = function(regData, isValid) {
        if (isValid) {
            $scope.loading = true;
            $scope.errorMsg = false;
            console.log("form submitted");
            $http.post('/routes/register', $scope.regData).then(function(res) {
                if (res.data.result == "success") {
                    $scope.loading = false;
                    $scope.successMsg = res.data.message + '....Redirecting';
                    $timeout(function() {
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