angular.module('serviceControllers', [])

        .controller('serviceController', function ($scope, $http, $location, $route, $window) {
                var str_url = $location.url().split('/');
                $http.get('/routes/admin/isAdmin').then(function (res) {
                        if (res.data.result == "success") {
                                $scope.isAdmin = true;
                        }
                });
                $http.get('/routes/detailedService/' + str_url[str_url.length - 2] + '/' + str_url[str_url.length - 1]).then(function (res) {
                        if (res.data.content.service_name)
                                $scope.service_name = res.data.content.service_name;
                        else
                                $scope.service_name = "No Name";
                        if (res.data.content.service_pic)
                                $scope.service_pic = res.data.content.service_pic;
                        else
                                $scope.service_pic = "noimage.svg";
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
                                for (var i = 0; i < res.data.content.service_rating.length; i++) {
                                        if (res.data.content.service_rating[i].rating)
                                                num += Number(res.data.content.service_rating[i].rating);
                                }
                                $scope.service_rating = num / Number(res.data.content.service_rating.length);
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

                $scope.reviewService = function (service) {
                        console.log(service);
                        var str_url = $location.url().split('/');
                        $http.post('/routes/reviews/' + str_url[str_url.length - 2] + '/' + str_url[str_url.length - 1], service).then(function (res) {
                                console.log(res.data.message);
                                $scope.reviewFailureMessage = null;
                                $scope.reviewSuccessMessage = null;
                                if (res.data.result == "failure")
                                        $scope.reviewFailureMessage = res.data.message;
                                else
                                        $scope.reviewSuccessMessage = res.data.message;

                        });
                };

                $scope.rateService = function (service) {
                        console.log(service);
                        var str_url = $location.url().split('/');
                        $http.post('/routes/rating/' + str_url[str_url.length - 2] + '/' + str_url[str_url.length - 1], service).then(function (res) {
                                console.log(res.data.message);
                                $scope.rateFailureMessage = null;
                                $scope.rateSuccessMessage = null;
                                if (res.data.result == "failure")
                                        $scope.rateFailureMessage = res.data.message;
                                else
                                        $scope.rateSuccessMessage = res.data.message;

                        });
                };

                $scope.reportReview = function (service) {
                        console.log(service);
                        var str_url = $location.url().split('/');
                        $http.post('/routes/report/' + str_url[str_url.length - 2] + '/' + str_url[str_url.length - 1], service).then(function (res) {
                                console.log(res.data.message);
                                $scope.reportFailureMessage = null;
                                $scope.reportSuccessMessage = null;
                                if (res.data.result == "failure")
                                        $scope.reportFailureMessage = res.data.message;
                                else
                                        $scope.reportSuccessMessage = res.data.message;

                        });
                };
                $scope.deleteReview = function (id) {
                        if ($scope.isAdmin) {
                                console.log(id);
                                $http.put('/routes/admin/deleteReview/' + id, {}).then(function (res) {

                                        $route.reload();

                                });
                        }
                };
                $scope.onlyBanUser = function (username) {
                        if ($scope.isAdmin) {
                                console.log($scope.isAdmin);
                                console.log(username);
                                $http.put('/routes/admin/only-ban-user/' + username, {}).then(function (res) {

                                        if (res.data.result == "success") {
                                                $scope.msg = 'The user has been banned!';
                                        } else {
                                                $scope.msg = 'Banning user not successful!';
                                        }

                                        $window.alert($scope.msg);

                                });
                        }
                };


                $scope.checkout = function () {
                        $scope.logged = null;
                        var logged = false;
                        $http.get('/routes/nav').then(function (res) {
                                if (res.data.result == 'success') {
                                        logged = true;
                                }


                                if (logged) {
                                        var handler = StripeCheckout.configure({
                                                key: 'pk_test_NxzB4uWCnPgIv2pcsnsVEwdd',
                                                image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                                                locale: 'auto',
                                                token: function (token) {
                                                        var input = { 'token': token, 'price': Number($scope.service_price) * 100 };
                                                        $http.post('/routes/checkout', input).then(function (res) {
                                                        });
                                                }
                                        });

                                        document.getElementById('customButton').addEventListener('click', function () {
                                                // Open Checkout with further options:
                                                handler.open({
                                                        name: str_url[str_url.length - 1].replace("%20", " "),
                                                        description: $scope.service_name,
                                                        amount: Number($scope.service_price) * 100
                                                });
                                        });

                                        // Close Checkout on page navigation:
                                        window.addEventListener('popstate', function () {
                                                handler.close();
                                        });
                                        $scope.logged = null;
                                } else {
                                        $scope.logged = "please login";
                                }
                        });
                };

                $scope.advertise = function () {
                        var str_url = $location.url().split('/');
                        $http.post('/routes/advertise/' + str_url[str_url.length - 2] + '/' + str_url[str_url.length - 1]).then(function (res) {
                                $scope.advertiseFailureMessage = null;
                                $scope.avertiseSuccessMessage = null;
                                if (res.data.result == "failure")
                                        $scope.advertiseFailureMessage = res.data.message;
                                else
                                        $scope.advertiseSuccessMessage = res.data.message;

                        });
                };
        });

























        // $scope.pay = function () {
        //                 console.log("working");
        //         };
        //         $scope.reportFunction = function (report) {
        //                 console.log($scope.report);
        //                 $http.get('/routes/detailedService/:businessname/:product', $scope.report.report).then(function (res) { console.log(res.data); });
        //         };
