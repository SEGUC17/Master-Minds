angular.module('Ang_Client_profile', [])

.controller('ClientprofileCtrl',function($scope,$http,$location,$route)
{/*this controller will be loaded when the page is viewed
   automatically it will load the user details
   and the business that he liked
 */
  $http.get('/routes/viewprofile').then(function(res)
  {

  if(res.data.result=="success")
  {
    $scope.fullName=res.data.content.fullName;
    $scope.username=res.data.content.username;
    $scope.email=res.data.content.email;
    $scope.address=res.data.content.address;
    $scope.phone_number=res.data.content.phone_number;
    $scope.liked = res.data.content.liked;
    $scope.profile_pic=res.data.content.profile_pic;
    $scope.like_message="liked businesses";
    if(res.data.content.liked.length==0)
    {
      $scope.like_message="you didn't like any pages";
    }
  //  console.log($scope.liked);
  }
  else
  {
    $scope.message=res.data.message;
  }

  });
})
.controller('AdminClientprofileCtrl',function($scope,$http,$location,$route)
{/*this controller will be loaded when the page is viewed
   automatically it will load the user details so the admin can ban him if he wants to
 */
 var str_url = $location.url().split('/');

  $http.get('/routes/viewprofile/'+str_url[str_url.length-1]).then(function(res)
  {

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

           $route.reload();
        });
    };
})

.controller('editClientCtrl', function($scope,$http,$location,$timeout,$window){
  $scope.message = "";
  // var fullName="";
  // var username="";
  // var email="";
  // var address="";
  // var phone_number="";

  // $http.get('/routes/viewprofile').then(function(res){
  //   if(res.data.result=="success"){
  //     fullName=res.data.content.fullName;
  //     username=res.data.content.username;
  //     email=res.data.content.email;
  //     address=res.data.content.address;
  //     phone_number=res.data.content.phone_number;
  //     //$scope.profile_pic=res.data.content.profile_pic;
  //   }else{
  //     $scope.message=res.data.message;
  //   }
  // });
  $scope.cancel = function(){
    $timeout(function(){
            $location.path('#/');
        }, 1000);
  }

  $scope.editProfile = function(){
    console.log($scope.data);
    if($scope.userForm.$pristine){
      $scope.message = "Fill at least one field to edit your profile."
    }else{
      // if(!$scope.data.fullName)
      //   $scope.data.fullName = fullName;
      // if(!$scope.data.username)
      //   $scope.data.username = username;
      // if(!$scope.data.email)
      //   $scope.data.email = email;
      // if(!$scope.data.address)
      //   $scope.data.address = address;
      // if(!$scope.data.phone_number)
      //   $scope.data.phone_number = phone_number;
      $http.post('/routes/editprofile', $scope.data).then(function(res){
        console.log(res.data.result)
          if (res.data.result == "success"){
           console.log(res.data.result)
           $window.location.href = '#/client_profile';
           $window.location.href;

          }else{
              $scope.message = res.data.message;
          }
      });
    }
  }
});
