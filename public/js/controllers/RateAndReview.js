angular.module('Ang_RateAndReviewCtrl', [])

.controller('RateAndReviewBusinessCtrl',function($scope,$http,$location)
{
  $scope.Post_Rate= function(RateData)
  {

  //    console.log($scope.RateData);
    var str_url = $location.url().split('/');
    $http.post('/routes/rating/'+str_url[str_url.length-1],$scope.RateData);

  };
  $scope.Post_Review= function(ReviewData)
  {
    var str_url = $location.url().split('/');

     $http.post('/routes/reviews/'+str_url[str_url.length-1],$scope.ReviewData);
       //  console.log(str_url);
  };
});
