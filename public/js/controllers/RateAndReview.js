angular.module('Ang_RateAndReviewCtrl', [])

.controller('RateAndReviewBusinessCtrl',function($scope,$http)
{
  $scope.Post_Rate= function(rate)
  {

      console.log($scope.rating);

  };
  $scope.Post_Reviw= function(review)
  {

      console.log($scope.review);
      $http.post('/routes/reviews/business3',$scope.review);
  };
});
