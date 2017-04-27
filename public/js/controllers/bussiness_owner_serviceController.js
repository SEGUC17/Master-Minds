var app = angular.module('boserviceCtrl', []);

app.controller('addCtrl', function($scope, $http, $location, $timeout) {
    $scope.addService = function(regData, isValid) {
        if (isValid) {
            $scope.loading = true;
            $scope.errorMsg = false;
            console.log("service  submitted");
            $http.post('/routes/service_add', $scope.regData).then(function(res) {
                if (res.data.result == "success") {
                    $scope.loading = false;
                    $scope.successMsg = res.data.message + '....Redirecting to the homepage';
                    $timeout(function() {
                        $location.path('#/');
                    }, 2000);

                } else {
                    $scope.loading = false;
                    $scope.errorMsg = res.data.message;
                }
            });
        }
    }
});

app.controller('editCtrl', function($scope, $http, $location, $timeout) {
    $scope.editservice = function(regData, isValid) {
        if (isValid) {
            $scope.loading = true;
            $scope.errorMsg = false;
            console.log("form submitted");
            $http.post('/routes/service_edit', $scope.regData).then(function(res) {
                if (res.data.result == "success") {
                    $scope.loading = false;
                    $scope.successMsg = res.data.message + '....Redirecting to the homepage';
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
