angular.module('Ang_Client_profile', [])

.controller('ClientprofileCtrl',function($scope,$http,$location)
{
  ///viewprofile
  //  console.log("rolling");
  $http.get('/routes/viewprofile').then(function(res)
  {
  //$scope.responce =res;
//    console.log($scope.RateData);
  console.log(res.data);
  if(res.data.message=="success")
  {
    $scope.fullName=res.data.fullName;
    $scope.username=res.data.username;
    $scope.email=res.data.email;
    $scope.address=res.data.address;
    $scope.phone_number=res.data.phone_number;
    $scope.liked = res.data.liked;
  }
  else
  {
    $scope.message=res.data.message
  }

  });
});
