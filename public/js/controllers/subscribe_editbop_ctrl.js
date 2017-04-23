var app = angular.module('subeditCtrl',[]);

app.controller('subCtrl', function($scope, $http, $location, $timeout){
	$scope.message = "";
	
	$scope.subscribe = function(data){
		// console.log('subCtrl working');
		// $scope.data.business_logo = $scope.form.business_logo;
  //       $http.post('/routes/subscribe', $scope.data).then(function(res){
  //           if (res.data.result == "success"){
                $timeout(function(){
                    $location.path('#/');
                }, 2000);
        //     }else{
        //        $scope.message = res.data.message;
        //     }
        // });
	}
});


app.controller('editbopCtrl', function($scope, $http, $location, $timeout){

	$scope.message = "";

	$scope.addSer = function(){
		$timeout(function(){
            $location.path('#/service_add');
        }, 1000);
	}

	$scope.editSer = function(){
		$timeout(function(){
            $location.path('#/service_edit');
        }, 1000);
	}

	$scope.cancel = function(){
		$timeout(function(){
            $location.path('#/');
        }, 1000);
	}
	$scope.edit = function(data){
		if($scope.form.$pristine){
			$scope.message = "You must fill at least one field in order to edit your business profile.";
		}else{
	        // $http.post('/routes/editboprofile', $scope.data).then(function(res){
	        //     if (res.data.result == "success"){
	                $timeout(function(){
	                    $location.path('#/');
	                }, 2000);
	        //     }else{
	        //         $scope.message = res.data.message;
	        //     }
	        // });
	    }
	}
});

// app.controller('subCtrl', ['$scope', 'multipartForm', function($scope, multipartForm){
// 	$scope.subscribe = function(data){
// 		var subUrl = '/subscribe';
// 		multipartForm.post(subUrl, $scope.data);
// 	}
// }]);