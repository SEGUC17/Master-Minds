angular.module('Ang_Homepage', [])
.controller('HomepageController', function($scope, $http, $location){

        $http.get('/routes/viewbusiness').then(function(res){
        $scope.businesses = res.data.content;
    });

    $http.get('/viewAdvertisement').then(function(res){
        $scope.ads = res.data.content;
    });

    $scope.getSearch = function(){
        bSearch($scope.Search);
    }

    function refresh(){
        $http.get('/routes/viewbusiness').then(function(res){
        $scope.businesses = res.data.content;
    });
    }

    function bSearch(search){

        $http.get("/routes/viewbusiness", {params:{"search": search}})
    .then(function (res) {
        if (search == undefined){
            refresh();
        }
        else{
        if (res.data.content){
            console.log(res.data.content);
            console.log(res.data.content[0].ban);
            console.log(res.data.content[0].accepted);
            if(res.data.content[0].ban == false && res.data.content[0].accepted == true ){
                $scope.businesses = res.data.content;
            }else{
                $scope.businesses = undefined;
                alert('The business you are looking for is either banned or not accepted yet');
            }
        }else{
            $scope.business = undefined;
            alert(res.data.message);
         }
        }
    });
        
    }

});

