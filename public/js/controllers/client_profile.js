angular.module('Ang_Client_profile', [])

.controller('ClientprofileCtrl',function($scope,$http,$location)
{
  ///viewprofile
  //  console.log("rolling");
  $http.get('/routes/viewprofile').then(function(res)
  {
  //$scope.responce =res;
//    console.log($scope.RateData);
  //console.log(res.data);
  if(res.data.result=="success")
  {
    $scope.fullName=res.data.content.fullName;
    $scope.username=res.data.content.username;
    $scope.email=res.data.content.email;
    $scope.address=res.data.content.address;
    $scope.phone_number=res.data.content.phone_number;
    $scope.liked = res.data.content.liked;
    $scope.profile_pic=res.data.content.profile_pic;
    if(res.data.content.liked.length==0)
    {
      $scope.liked=[{business_names:"you didn't like any pages"}];
    }

  }
  else
  {
    $scope.message=res.data.message;
  }

  });
});
