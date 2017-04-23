angular.module('Ang_RateAndReviewCtrl', [])

.controller('RateAndReviewBusinessCtrl',function($scope,$http,$location)
{ 

  $scope.Post_Rate_Business= function(RateData)
  {

  
    var str_url = $location.url().split('/');
    $http.post('/routes/rating/'+str_url[str_url.length-1],$scope.RateData)
    .then(function(res)
    {

     
      $scope.resp_rate=res.data.message;

    });


  };
  $scope.Post_Review_Business= function(RateData)
  {
    var str_url = $location.url().split('/');

     $http.post('/routes/reviews/'+str_url[str_url.length-1],$scope.RateData).then(function(res)
     {
      

       $scope.resp_review=res.data.message;
     });

     
  };

    $scope.Post_Rate_Service= function(RateData)
    {

   
      var str_url = $location.url().split('/');
      $http.post('/routes/rating/'+str_url[str_url.length-2]+'/'+str_url[str_url.length-1],$scope.RateData)
      .then(function(res)
      {
        
      $scope.resp_rate=res.data.message;
      });

    };
    $scope.Post_Review_Service= function(RateData)
    {
      var str_url = $location.url().split('/');

       $http.post('/routes/reviews/'+str_url[str_url.length-2]+'/'+str_url[str_url.length-1],$scope.RateData)
       .then(function(res)
       {
         
    $scope.resp_review=res.data.message;
       });

         
    };
});
