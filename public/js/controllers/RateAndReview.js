angular.module('Ang_RateAndReviewCtrl', [])

.controller('RateAndReviewBusinessCtrl',function($scope,$http,$location)
{
/*
 this method posts the rate to the backend for the business
 by putting a rating in body and posting to the /routes/rating/+ last element to url
*/
  $scope.Post_Rate_Business= function(RateData)
  {

  
    var str_url = $location.url().split('/');
    $http.post('/routes/rating/'+str_url[str_url.length-1],$scope.RateData)
    .then(function(res)
    {

     
      $scope.resp_rate=res.data.message;

    });


  };
  
/*
 this method posts the review to the backend for the business
 by putting a review in body and posting to the '/routes/reviews/'+ last element to url
*/
  $scope.Post_Review_Business= function(RateData)
  {
    var str_url = $location.url().split('/');

     $http.post('/routes/reviews/'+str_url[str_url.length-1],$scope.RateData).then(function(res)
     {
       $scope.resp_review=res.data.message;
     });

     
  };
/*
 this method posts the rate to the backend for the service
 by putting a rating in body and posting to the /routes/rating/+ last two element to url
*/

    $scope.Post_Rate_Service= function(RateData)
    {

   
      var str_url = $location.url().split('/');
      $http.post('/routes/rating/'+str_url[str_url.length-2]+'/'+str_url[str_url.length-1],$scope.RateData)
      .then(function(res)
      {
        
      $scope.resp_rate=res.data.message;
      });

    };
  
/*
 this method posts the review to the backend for the service
 by putting a rating in body and posting to the /routes/review/+ last two element to url
*/
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
