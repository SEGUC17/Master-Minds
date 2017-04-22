angular.module('Ang_view_rateandreview', [])

.controller('ViewRateAndReviewCtrl',function($scope,$http,$location)
{
	var str_url = $location.url().split('/');
	$http.get('/routes/viewRateBusiness/'+str_url[str_url.length-1])
	.then(function(res)
    {
    	console.log(res.data.content.rate);
    });

});

	/*$scope.Post_Rate_Business= function(RateData)
  {

  //    console.log($scope.RateData);
    var str_url = $location.url().split('/');
    $http.get('/routes/rating/'+str_url[str_url.length-1],$scope.RateData)
    .then(function(res)
    {
      //$scope.responce =res;
  //    console.log($scope.RateData);
      console.log(res.data.message);
      $scope.resp_rate=res.data.message;

    });




	$http.get('/routes/viewRateBusiness').then(function(res)
  {console.log(res.data);
  if(res.data.result=="success")
  {
    $scope.business_name=res.data.content.business_name;
    $scope.rate=res.data.content.rate;
    if(res.data.content.rate.length==0)
    {
      $scope.rate=[{rate:"There are no rates for this business yet"}];
    }
  }
  else
  {
    $scope.message=res.data.message
  }

  });


  $http.get('/routes/viewRateService').then(function(res)
  {console.log(res.data);
  if(res.data.result=="success")
  {
    $scope.business_name=res.data.content.business_name;
    $scope.service=res.data.content.service;
    $scope.rate=res.data.content.rate;
    if(res.data.content.rate.length==0)
    {
      $scope.rate=[{rate:"There are no rates for this service yet"}];
    }
  }
  else
  {
    $scope.message=res.data.message
  }

  });



  $http.get('/routes/viewReviewBusiness').then(function(res)
  {console.log(res.data);
  if(res.data.result=="success")
  {
    $scope.business_name=res.data.content.business_name;
    $scope.review=res.data.content.review;
    if(res.data.content.review.length==0)
    {
      $scope.review=[{review:"There are no reviews for this business yet"}];
    }
  }
  else
  {
    $scope.message=res.data.message
  }

  });



  $http.get('/routes/viewReviewService').then(function(res)
  {console.log(res.data);
  if(res.data.result=="success")
  {
    $scope.business_name=res.data.content.business_name;
    $scope.service=res.data.content.service;
    $scope.review=res.data.content.review;
    if(res.data.content.review.length==0)
    {
      $scope.review=[{review:"There are no reviews for this service yet"}];
    }
  }
  else
  {
    $scope.message=res.data.message
  }

  });

 });

 */
