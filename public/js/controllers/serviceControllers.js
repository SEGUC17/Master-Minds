angular.module('serviceControllers', [])

        .controller('serviceController', function ($scope, $http, $location) {
                var str_url = $location.url().split('/');
                $http.get('/routes/detailedService/' + str_url[str_url.length - 2] + '/' + str_url[str_url.length - 1]).then(function (res) {
                        if (res.data.content.service_name)
                                $scope.service_name = res.data.content.service_name;
                        else
                                $scope.service_name = "No Name";
                        if (res.data.content.service_pic)
                                $scope.service_pic = res.data.content.service_pic;
                        else
                                $scope.service_pic = "../../noimage.svg";
                        if (res.data.content.service_description)
                                $scope.service_description = res.data.content.service_description;
                        else
                                $scope.service_description = "No Description";
                        if (res.data.content.service_price) {
                                if (res.data.content.promotion_offer) {
                                        $scope.service_price = Number(res.data.content.service_price) - Number(res.data.content.service_price) * Number(res.data.content.promotion_offer) * 0.01;
                                        $scope.promotion_offer = res.data.content.promotion_offer;
                                } else {
                                        $scope.service_price = res.data.content.service_price;
                                }
                        } else {
                                $scope.service_price = "0.00";
                        }
                        if (res.data.content.service_rating.length != 0) {
                                var num = 0;
                                for (var i = 0; i < res.data.content.service_rating.length; i++)
                                        num += Number(res.data.content.service_rating[i].rating);
                                $scope.service_rating = num/Number(res.data.content.service_rating.length);
                        } else {
                                $scope.service_rating = "No Rating";
                        }
                        if (res.data.content.service_reviews)
                                $scope.service_reviews = res.data.content.service_reviews;
                        else
                                $scope.service_reviews = "No Comments";
                        if (res.data.content.type_flag)
                                $scope.type_flag = res.data.content.type_flag;
                        else
                                $scope.type_flag = "No Type";
                        if (res.data.content.available_flag)
                                $scope.available_flag = res.data.content.available_flag;
                        else
                                $scope.available_flag = "No Flag";

                        console.log($scope);
                });
        });

























        // $scope.pay = function () {
        //                 console.log("working");
        //         };
        //         $scope.reportFunction = function (report) {
        //                 console.log($scope.report);
        //                 $http.get('/routes/detailedService/:businessname/:product', $scope.report.report).then(function (res) { console.log(res.data); });
        //         };