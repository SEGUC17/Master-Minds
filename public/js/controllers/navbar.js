angular.module('NavigationBar', [])

    .controller('navigation', function ($scope, $http, $location) {
        $http.get('/routes/nav').then(function (res) {
            if (res.data.result == 'success') {
                if (res.data.message != 'business') {
                    $scope.username = res.data.content.username;
                    $scope.type = res.data.message;
                } else {
                    $scope.username = res.data.content.personal_email;
                    $scope.type = res.data.message
                }
            }

            $scope.logout = function () {
                console.log("entered");
                $http.post('/routes/logout').then(function (res) {
                    $scope.username = null;
                    $scope.type = null;
                    $window.location.reload();
                });
            };
        });

    });