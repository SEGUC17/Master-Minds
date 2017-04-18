angular.module('Ang_RateAndReviewCtrl', [])

.controller('RateAndReviewBusinessCtrl',function($scope,$http)
{
  $scope.Post_Rate= function(RateData)
  {

      console.log($scope.RateData);

  };
  $scope.Post_Review= function(ReviewData)
  {

      console.log($scope.ReviewData);
     $http.post('/routes/reviews/business3',$scope.ReviewData);
  };
});
