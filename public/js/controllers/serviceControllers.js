angular.module('serviceControllers', [])

        .controller('serviceController', function ($scope, $http) {
                $scope.pay = function () {
                        console.log("working");
                };
                $scope.reportFunction = function (report) {
                        console.log($scope.report);
                        $http.post('/routes/detailedService/:businessname/:product', $scope.report.report);
                };
        });