angular.module('Ang_Homepage', [])
.controller('HomepageController', function($scope, $http, $location){

        $http.get('/routes/viewbusiness').then(function(res){
        $scope.businesses = res.data.content;
        console.log(res.data.content);
    });

    $scope.getSearch = function(){
        bSearch($scope.Search);
    }

    function bSearch(search){
        if(search){
            console.log(search);
        $http.get("/routes/viewbusiness", {params:{"search": search}})
    .then(function (res) {

            console.log(res.data.content);
        for(var i = 0; i < res.data.content.length;i++){
            if(res.data.content[i].business_name == search){
                $scope.businesses = res.data.content[i];
                console.log($scope.businesses)
                console.log($scope.flag)
            }
        }
    });
        }
    }


});
