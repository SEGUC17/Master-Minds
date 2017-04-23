angular.module('Ang_view_rateandreview', [])

.controller('ViewRateAndReviewCtrl',function($scope,$http,$location, $window)
{
	var str_url = $location.url().split('/');
	console.log(str_url[str_url.length-1]);
	$http.get('/routes/viewRateBusiness/'+str_url[str_url.length-1])
	.then(function(res)
    {
    	console.log(res.data.result);
    	if(res.data.result=='success'){
    		$scope.business=str_url[str_url.length-1];
    		$scope.resp_rate=res.data.content.rate;
    		console.log(res.data.content);
    	}else{
    		$scope.message=res.data.message;
    		console.log('There is no rating for this business');
    	}
    })

    var str_url = $location.url().split('/');
	$http.get('/routes/viewReviewBusiness/'+str_url[str_url.length-1])
	.then(function(res){
		console.log(res.data.result);
		if(res.data.result=='success'){
			$scope.resp_review=res.data.content;
    		console.log(res.data.content);
    	}else{
    		$scope.message=res.data.message;
    		console.log('There is no review for this business');
    	}
	})
	$scope.reportReview = function (bus_review) {
					console.log(bus_review);
					var str_url = $location.url().split('/');
					$http.post('/routes/reportBusiness/'  + str_url[str_url.length - 1], bus_review)
					.then(function (res) {

					$scope.Message = res.data.message;
					if(res.data.result=="success")
					$window.location.reload();
					});
	};
});
