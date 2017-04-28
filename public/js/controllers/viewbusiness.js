angular.module('Ang_viewbusiness', [])
  .controller('ViewBusinessCtrl', function ($scope, $http, $location, $route, $window) {
    var str_url = $location.url().split('/');
    var index = str_url.length - 1;
    var element = str_url[index];
    $scope.location = str_url[str_url.length - 1];
    $scope.isAdmin = false;
    $scope.banned = false;
    $http.get('/routes/admin/isAdmin').then(function (res) {
      if (res.data.result == "success") {
        $scope.isAdmin = true;
      }
    });

    $http.get('/routes/liked/' + element.replace('%20', ' ')).then(function (res) {
      $scope.liked == null;
      $scope.isClient == false;
      if (res.data.result == "success")
        $scope.liked = true;
      else
        if (res.data.message == 'like')
          $scope.liked = false;
      if (res.data.message != 'you are not a client')
        $scope.isClient = true;
    });

    $scope.rateBusiness = function (service) {
      console.log(service);
      var str_url = $location.url().split('/');
      $http.post('/routes/rating/' + str_url[str_url.length - 1], service).then(function (res) {
        console.log(res.data.message);
        $scope.rateFailureMessage = null;
        $scope.rateSuccessMessage = null;
        if (res.data.result == "failure")
          $scope.rateFailureMessage = res.data.message;
        else
          $scope.rateSuccessMessage = res.data.message;

      });
    };

    $http.get("/routes/viewbusiness", { params: { "search": element.replace('%20', ' ') } })
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

        if (res.data.content[0].business_reviews)
          $scope.business_reviews = res.data.content[0].business_reviews;
        else
          $scope.business_reviews = "No Comments";

        console.log(res.data.content[0].business_rating)
        if (res.data.content[0].business_rating.length != 0) {
          var num = 0;
          for (var i = 0; i < res.data.content[0].business_rating.length; i++)
            num += Number(res.data.content[0].business_rating[i].rating);
          $scope.business_rating = num / Number(res.data.content[0].business_rating.length);
        } else {
          $scope.business_rating = "No Rating";
        }

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

        if (res.data.content[0].address)
          $scope.business_address = res.data.content[0].address;
        else
          $scope.business_website = "No Address available";

        if (res.data.content[0].fullName)
          $scope.fullName = res.data.content[0].fullName;
        else
          $scope.fullName = "Not Available";

        if (res.data.content[0].FAQ)
          $scope.FAQ = res.data.content[0].FAQ;
        else
          $scope.FAQ = "N/A";
        console.log($scope.business_name)

        $scope.name = $scope.business_name;

        if (res.data.content[0]) {
          $scope.banned = res.data.content[0].ban;
        }

        $scope.reviewBusiness = function (business) {
          console.log(business);
          var str_url = $location.url().split('/');
          $http.post('/routes/reviews/' + str_url[str_url.length - 1], business).then(function (res) {
            console.log(res.data.message);
            $scope.reviewFailureMessage = null;
            $scope.reviewSuccessMessage = null;
            if (res.data.result == "failure")
              $scope.reviewFailureMessage = res.data.message;
            else
              $scope.reviewSuccessMessage = res.data.message;

          });
        };

        $scope.reportReview = function (business) {
          console.log(business);
          var str_url = $location.url().split('/');
          $http.post('/routes/reportBusiness/' + str_url[str_url.length - 1], business).then(function (res) {
            console.log(res.data.message);
            $scope.reportFailureMessage = null;
            $scope.reportSuccessMessage = null;
            if (res.data.result == "failure")
              $scope.reportFailureMessage = res.data.message;
            else
              $scope.reportSuccessMessage = res.data.message;

          });
        };

        $scope.getLikeBusiness = function () {
          likeBusiness($scope.name);
        }

        function likeBusiness(name) {
          console.log($scope.name);

          $http.post('/routes/like', { name: $scope.name }).then(function (res) {

            alert(res.data.message);
            $window.location.reload();
          });
        }
        $scope.getUnlikeBusiness = function () {
          unlikeBusiness($scope.name);
        }

        function unlikeBusiness(name) {
          console.log($scope.name);

          $http.post('/routes/unlike', { name: $scope.name }).then(function (res) {

            alert(res.data.message);
            $window.location.reload();
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
