angular.module('Ang_viewbusiness',[])
.controller('ViewBusinessCtrl', function($scope, $http, $location){
    var str_url = $location.url().split('/');
    var index = str_url.length - 1;
    var element = str_url[index];

    $http.get("/routes/viewbusiness", {params:{"search": element}})
.then(function (res) {
            console.log(res.data.content[0].business_name);

        });
    });

    // $http.get('/routes/viewbusiness').then(function (res) {
    //   console.log("data");
    //   console.log(res.data);
    //   console.log(res.data.content[0].business_name);
    //   if(res.data.content[0].business_name)
    //     $scope.business_name = res.data.content[0].business_name;
    //   else
    //     $scope.business_name = "No Name";
    //
    //   if(res.data.content[0].business_logo)
    //     $scope.business_logo = res.data.content[0].business_logo;
    //   else
    //     $scope.business_logo = "No Image"
    //
    //   if(res.data.content[0].business_description)
    //     $scope.business_description = res.data.content[0].business_description;
    //   else
    //     $scope.business_description = "No Description available";
    //     console.log($scope.business_name);
    // });
