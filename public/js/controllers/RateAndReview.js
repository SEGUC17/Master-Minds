angular.module('Ang_RateAndReviewCtrl', [])

.controller('RateAndReviewBusinessCtrl',function($scope,$http,$location)
{
  $scope.Post_Rate_Business= function(RateData)
  {

  //    console.log($scope.RateData);
    var str_url = $location.url().split('/');
    $http.post('/routes/rating/'+str_url[str_url.length-1],$scope.RateData).then(function(res)
    {
      //$scope.responce =res;
      console.log(res.data);
    });


  };
  $scope.Post_Review_Business= function(ReviewData)
  {
    var str_url = $location.url().split('/');

     $http.post('/routes/reviews/'+str_url[str_url.length-1],$scope.ReviewData).then(function(res)
     {
       //$scope.responce =res;
       console.log(res.data);
     });

       //  console.log(str_url);
  };

    $scope.Post_Rate_Service= function(RateData)
    {

    //    console.log($scope.RateData);
      var str_url = $location.url().split('/');
      $http.post('/routes/rating/'+str_url[str_url.length-2]+'/'+str_url[str_url.length-1],$scope.RateData)
      .then(function(res)
      {
        //$scope.responce =res;
        console.log(res.data);
      });

    };
    $scope.Post_Review_Service= function(ReviewData)
    {
      var str_url = $location.url().split('/');

       $http.post('/routes/reviews/'+str_url[str_url.length-2]+'/'+str_url[str_url.length-1],$scope.ReviewData)
       .then(function(res)
       {
         //$scope.responce =res;
         console.log(res.data);
       });

         //  console.log(str_url);
    };
});
