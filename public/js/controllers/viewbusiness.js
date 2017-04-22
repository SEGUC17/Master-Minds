angular.module('Ang_viewbusiness',[])
.controller('ViewBusinessCtrl', function($scope, $http, $location){
    var str_url = $location.url().split('/');
    $http.get('/routes/' +  str_url[str_url.length - 1]).then(function (res) {
      if(res.content.business_name)
        $scope.business_name = res.content.business_name;
      else
        $scope.business_name = "No Name";

        console.log($scope.business_name);
    }
});
