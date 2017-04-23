angular.module('Ang_viewbusiness', [])
  .controller('ViewBusinessCtrl', function ($scope, $http, $location,$route) {
    var str_url = $location.url().split('/');
    var index = str_url.length - 1;
    var element = str_url[index];
    $scope.location = $location.url();
    $scope.isAdmin = false;
    $scope.banned = false;
    $http.get('/routes/admin/isAdmin').then(function (res) {
      if (res.data.result == "success") {
        $scope.isAdmin = true;
      }
    });

    $http.get("/routes/viewbusiness", { params: { "search": element } })
      .then(function (res) {

        console.log(res.data.content);
        console.log(res.data.content[0].services);
        if (res.data.content[0].business_name)
          $scope.business_name = res.data.content[0].business_name;
        else
          $scope.business_name = "No Name";

        if (res.data.content[0].business_logo) {
          $scope.business_logo = res.data.content[0].business_logo;
          console.log($scope.business_logo);
        }

        else
          $scope.business_logo = "No Image"

        if (res.data.content[0].business_description)
          $scope.business_description = res.data.content[0].business_description;
        else
          $scope.business_description = "No Description available";

        if (res.data.content[0].services)
          $scope.services = res.data.content[0].services;
        //console.log($scope.services);
        else
          $scope.services = "No services available";

        if (res.data.content[0].business_emails)
          $scope.business_emails = res.data.content[0].business_emails;
        else
          $scope.business_email = "No email available";

        if (res.data.content[0].business_website)
          $scope.business_website = res.data.content[0].business_website;
        else
          $scope.business_website = "No website available";

        if (res.data.content[0].FAQ)
          $scope.FAQ = res.data.content[0].FAQ;
        else
          $scope.FAQ = "N/A";
        console.log($scope.business_name)

        $scope.name = $scope.business_name;

        if(res.data.content[0]){
          $scope.banned = res.data.content[0].ban;
        }
        

        $scope.getLikeBusiness = function () {
          likeBusiness($scope.name);
        }

        function likeBusiness(name) {
          console.log($scope.name);

          $http.post('/routes/like', { name: $scope.name }).then(function (res) {

            alert(res.data.message);
          });
        }

      });
    $scope.banBus = function (username) {
      $http.put('/routes/admin/ban-bus/' + username, {}).then(function (res) {
        // $timeout(function() {
        //     $route.reload();
        // }, 500);
        //$scope.getUsers();
        $route.reload();
      });
    };
    $scope.deleteBus = function (username) {
      $http.put('/routes/admin/deletebussines/' + username, {}).then(function (res) {

        $location.path('/');

      });
    };
  });

app.controller("tabController", function () {
  this.tab = 1;

  this.selectTab = function (setTab) {
    this.tab = setTab;
  };

  this.isSelected = function (checkTab) {
    return this.tab === checkTab;
  };

});
