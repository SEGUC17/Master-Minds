angular.module('Ang_view_rateandreview', [])

.controller('ViewRateAndReviewCtrl',function($scope,$http,$location, $window,$route)
{
	$scope.isAdmin = false;

  	$http.get('/routes/admin/isAdmin').then(function (res) {
    	if (res.data.result == "success") {
    		$scope.isAdmin = true;
   		}
 	});
	var str_url = $location.url().split('/');
	
	$http.get('/routes/viewRateBusiness/'+str_url[str_url.length-1])
	.then(function(res)
    {
    
    	if(res.data.result=='success'){
    		$scope.business=str_url[str_url.length-1];
    		$scope.resp_rate=res.data.content.rate;
    		
    	}else{
    		$scope.message=res.data.message;
    		
    	}
    })

    var str_url = $location.url().split('/');
	$http.get('/routes/viewReviewBusiness/'+str_url[str_url.length-1])
	.then(function(res){
		
		if(res.data.result=='success'){
			$scope.resp_review=res.data.content;
    		
    	}else{
    		$scope.message=res.data.message;
    		
    	}
	})
	/*
	this will report review done by someone 
	by pressing a button report this method will be called 
	it will post in the backend by calling/routes/reportBusiness/+last element
	and adding the review to the body
	*/
	$scope.reportReview = function (bus_review) {
					
					var str_url = $location.url().split('/');
					$http.post('/routes/reportBusiness/'  + str_url[str_url.length - 1], bus_review)
					.then(function (res) {

					$scope.Message = res.data.message;
					if(res.data.result=="success")
					$window.location.reload();
					});
	};
	$scope.deleteReview = function (id) {
      if ($scope.isAdmin) {
        console.log(id);
        $http.put('/routes/admin/deleteReview/' + id, {}).then(function (res) {

          $route.reload();
                                       
         });
      }
    };
    $scope.onlyBanUser = function (username) {
      if ($scope.isAdmin) {
        console.log($scope.isAdmin);
        console.log(username);
        $http.put('/routes/admin/only-ban-user/' + username, {}).then(function (res) {
                                      
        if(res.data.result == "success"){
            $scope.msg = 'The user has been banned!';
            }else{
            $scope.msg = 'Banning user not successful!';
            }
            
            $window.alert($scope.msg);                                       
        });
      }
    };

});
