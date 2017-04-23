angular.module('Ang_Client_profile', [])

.controller('ClientprofileCtrl',function($scope,$http,$location,$route)
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
})
.controller('AdminClientprofileCtrl',function($scope,$http,$location,$route)
{var str_url = $location.url().split('/');
  ///viewprofile
  //  console.log("rolling");
  $http.get('/routes/viewprofile/'+str_url[str_url.length-1]).then(function(res)
  {
  //$scope.responce =res;
//    console.log($scope.RateData);
  console.log(res.data);
      if(res.data.result=="success")
      {
        $scope.fullName=res.data.content.fullName;
        $scope.username=res.data.content.username;
        $scope.email=res.data.content.email;
        $scope.address=res.data.content.address;
        $scope.phone_number=res.data.content.phone_number;
        $scope.liked = res.data.content.liked;
        $scope.profile_pic=res.data.content.profile_pic;
        $scope.banned=res.data.content.ban;
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
  $scope.banUser = function(username){
        $http.put('/routes/admin/ban-user/'+username,{}).then(function(res) {
           // $timeout(function() {
           //     $route.reload();
           // }, 500);
           //$scope.getUsers();
           $route.reload();
        });
    };
});
