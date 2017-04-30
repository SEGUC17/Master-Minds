var app = angular.module('userControllers', []);

// the register controller
app.controller('regCtrl', function ($scope, $http, $location, $timeout) {
    $scope.regUser = function (regData, isValid) { // the function used to register a new user
        if (isValid) {
            $scope.loading = true;
            $scope.errorMsg = false;
            //             console.log("form submitted");
            $http.post('/routes/register', $scope.regData).then(function (res) {
                if (res.data.result == "success") {
                    $scope.loading = false;
                    $scope.successMsg = res.data.message + '....Redirecting to the login page'; // showing the success message
                    $timeout(function () {
                        $location.path('/login'); // on success redirect to the homepage
                    }, 2000); // 2 seconds delay

                } else {
                    $scope.loading = false;
                    $scope.errorMsg = res.data.message; //showing the error message
                }
            });
        }
    };
});

// the login controller
app.controller('loginCtrl', function ($scope, $http, $location, $timeout, $route, $document, $window) {
    $scope.logUser = function (logData, isValid) { // the function used to log in a user
        if (isValid) {
            $scope.loading = true;
            $scope.errorMsg = false;
            //             console.log("login form submitted");
            $http.post('/routes/login', $scope.logData).then(function (res) {
                if (res.data.result == "success") {
                    $scope.loading = false;
                    $scope.successMsg = res.data.message + '......Redirecting to the homepage'; // showing the success message
                    $timeout(function () {
                        $window.location.reload(); // refresh the page
                        $location.path('#/'); // on success redirect to the homepage
                    }, 2000); // 2 seonds delay
                } else {
                    $scope.loading = false;
                    $scope.errorMsg = res.data.message; // showing the error message
                }
            });
        }
    };
});
