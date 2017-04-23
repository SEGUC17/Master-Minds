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
            $location.path('/service_add');//redirect to the service add page
        }, 1000);
	}

	$scope.editSer = function(){
		$timeout(function(){
            $location.path('/service_edit');//redirect to the service edit page
        }, 1000);
	}

	$scope.cancel = function(){
		$timeout(function(){
            $location.path('#/');//go back to the home page
        }, 1000);
	}
	$scope.edit = function(){
		if($scope.form.$pristine){
			$scope.message = "You must fill at least one field in order to edit your business profile.";//check if no fields to edit
		}else{
	        // $http.post('/routes/editboprofile', $scope.data).then(function(res){
	        //     if (res.data.result == "success"){
	                $timeout(function(){
	                    $location.path('#/');//redirect to the homepage
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