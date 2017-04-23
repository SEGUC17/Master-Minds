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
})
.controller('AdminClientprofileCtrl',function($scope,$http,$location)
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
        $http.put('/routes/admin/only-ban-user/'+username,{}).then(function(res) {
           // $timeout(function() {
           //     $route.reload();
           // }, 500);
           $scope.getUsers();
        });
    };
})

.controller('editClientCtrl', function($scope,$http,$location,$timeout){
  $scope.message = "";
  var fullName="";
  var username="";
  var email="";
  var address="";
  var phone_number="";

  $http.get('/routes/viewprofile').then(function(res){
    if(res.data.result=="success"){
      fullName=res.data.content.fullName;
      username=res.data.content.username;
      email=res.data.content.email;
      address=res.data.content.address;
      phone_number=res.data.content.phone_number;
      //$scope.profile_pic=res.data.content.profile_pic;
    }else{
      $scope.message=res.data.message;
    }
  });
  $scope.cancel = function(){
    $timeout(function(){
            $location.path('#/');
        }, 1000);
  }
  $scope.editProfile = function(data){
    if($scope.userForm.$pristine){
      $scope.message = "Fill at least one field to edit your profile."
    }else{
      if(!$scope.data.fullName)
        $scope.data.fullName = fullName;
      if(!$scope.data.username)
        $scope.data.username = username;
      if(!$scope.data.email)
        $scope.data.email = email;
      if(!$scope.data.address)
        $scope.data.address = address;
      if(!$scope.data.phone_number)
        $scope.data.phone_number = phone_number;
      $http.post('/routes/editprofile', $scope.data).then(function(res){
          if (res.data.result == "success"){
              $timeout(function(){
                  $location.path('#/');
              }, 2000);
          }else{
              $scope.message = res.data.message;
          }
      });
    }
  }
});


