var app = angular.module('boserviceCtrl', []);

app.controller('addCtrl', function($scope, $http, $location, $timeout) {
    $scope.regData = {};
    $scope.picture = "";
    $scope.addService = function(regData) {
        var files = $('#file')[0].files;
        if(files.length == 0){
            $scope.picture = "Your service picture is required";
        }else{
            $scope.picture = "";
            var formData = new FormData;

            var type = false;
            var available = false;

            console.log($scope.regData.type_flag);
            console.log($scope.regData.available_flag);

            for(key in $scope.regData){
                formData.append(key, $scope.regData[key]);
            }

            if($scope.regData.type_flag){
                type = true;
            }
            if($scope.regData.available_flag){
                available = true;
            }
            formData.append('type_flag', type);
            formData.append('available_flag', available);

            var image = files[0];
            formData.append('service_pic', image);

            $http.post('/routes/service_add', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function(res){
                if(res.data.result == 'success'){
                    $scope.loading = false;
                    $scope.successMsg = res.data.message + '....Redirecting to the homepage';
                    $timeout(function(){
                            $location.path('#/');
                    }, 2000);
                }else{
                    $scope.loading = false;
                    $scope.errorMsg = res.data.message;
                }
            });
        }
    }
});

app.controller('editCtrl', function($scope, $http, $location, $timeout) {
    $scope.regData = {};
    $scope.editservice = function(regData) {
        var files = $('#file')[0].files;
        if(files.length>0){
            var formData = new FormData;

            var type = false;
            var available = false;

            console.log($scope.regData.newtype_flag);
            console.log($scope.regData.newavailable_flag);

            for(key in $scope.regData){
                formData.append(key, $scope.regData[key]);
            }

            if($scope.regData.newtype_flag){
                type = true;
            }
            if($scope.regData.newavailable_flag){
                available = true;
            }
            formData.append('newtype_flag', type);
            formData.append('newavailable_flag', available);

            var image = files[0];
            formData.append('service_pic', image);

            $http.post('/routes/service_edit', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function(res){
                if(res.data.result == 'success'){
                    $scope.loading = false;
                    $scope.successMsg = res.data.message + '....Redirecting to the homepage';
                    $timeout(function(){
                            $location.path('#/');
                    }, 2000);
                }else{
                    $scope.loading = false;
                    $scope.errorMsg = res.data.message;
                }
            });
        }else{
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
