angular.module('Ang_Homepage', [])
.controller('HomepageController', function($scope, $http, $location){

        $http.get('/routes/viewbusiness').then(function(res){  // gets businesses
        $scope.businesses = res.data.content;
    });

    $http.get('/viewAdvertisement').then(function(res){ // gets ads
        $scope.ads = res.data.content;
    });

    $scope.getSearch = function(){ //passes search scope to bsearch
        bSearch($scope.Search);
    }

    function refresh(){ //refreshes scope after failed deletions
        $http.get('/routes/viewbusiness').then(function(res){
        $scope.businesses = res.data.content;
    });
    }

    function bSearch(search){ //searches for a specific business

        $http.get("/routes/viewbusiness", {params:{"search": search}}) //calls backend functions
    .then(function (res) {
        if (search == undefined){ //if search field is empty refresh
            refresh();
        }
        else{
        if (res.data.content){ //if there is data then we found a business
            if(res.data.content[0].ban == false && res.data.content[0].accepted == true ){  //checks ban and accepted
                $scope.businesses = res.data.content;
            }else{
                $scope.businesses = undefined; //error handling
                alert('The business you are looking for is either banned or not accepted yet');
            }
        }else{
            $scope.businesses = undefined;//error handling
            alert(res.data.message);
         }
        }
    });
        
    }

});

