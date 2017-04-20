angular.module('serviceControllers', [])

        .controller('serviceController', function ($scope, $http, $location) {
                $http.get('/routes/detailedService/:businessname/:product').then(function (res) { console.log(res.data); });
                var str_url = $location.url().split('/');
                $http.get('/routes/detailedService/'+str_url[str_url.length-2]+str_url[str_url.length-1]).then(function (res) { console.log(res.data); });
        });

























        // $scope.pay = function () {
        //                 console.log("working");
        //         };
        //         $scope.reportFunction = function (report) {
        //                 console.log($scope.report);
        //                 $http.get('/routes/detailedService/:businessname/:product', $scope.report.report).then(function (res) { console.log(res.data); });
        //         };