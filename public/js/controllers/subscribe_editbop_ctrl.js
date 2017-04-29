var app = angular.module('subeditCtrl',[]);

app.controller('subCtrl', function($scope, $http, $location, $timeout){
	$scope.data = {};
	$scope.message ='';
	$scope.logo = "";
	
	$scope.subscribe = function(data){
		var files = $('#file')[0].files;
		if(files.length > 0){

			var formData = new FormData;

			for(key in $scope.data){
				formData.append(key, $scope.data[key]);
			}

			var image = files[0];
			formData.append('business_logo', image);

			$http.post('/routes/subscribe', formData, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined
				}
			}).then(function(res){
				if(res.data.result == 'success'){
					$scope.message = 'Successfully subscribed! Redirecting to login page';
					$timeout(function(){
		                    $location.path('/login');//redirect to the login page
		            }, 2000);
				}else{
					$scope.message = res.data.message;
				}
			});
		}else{
			$scope.logo = "Need to upload a business logo";
		}
	}
});


app.controller('editbopCtrl', function($scope, $http, $location, $timeout){

	$scope.message = '';

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
	$scope.edit = function(data){
		var files = $('#file')[0].files;
		if($scope.form.$pristine && files.length == 0){
			$scope.message = "You must fill at least one field in order to edit your business profile.";//check if no fields to edit
		}else{
			if(files.length == 0){
				console.log('second if');
		        $http.post('/routes/editboprofile', $scope.data).then(function(res){
		            if (res.data.result == "success"){
		                $timeout(function(){
		                    $location.path('#/');//redirect to the homepage
		                }, 2000);
		            }else{
		                $scope.message = res.data.message;
		            }
		        });
		    }else{
		        var formData = new FormData;

				for(key in $scope.data){
					formData.append(key, $scope.data[key]);
				}

				var image = files[0];
				formData.append('business_logo', image);

				$http.post('/routes/editboprofile', formData, {
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined
					}
				}).then(function(res){
					if(res.data.result == 'success'){
						$scope.message = 'Profile updated! Redirecting to homepage';
						$timeout(function(){
			                    $location.path('#/');//redirect to the homepage
			            }, 2000);
					}else{
						$scope.message = res.data.message;
					}
				});
			}
	    }
	}
});

// app.controller('subCtrl', ['$scope', 'multipartForm', function($scope, multipartForm){
// 	$scope.subscribe = function(data){
// 		var subUrl = '/subscribe';
// 		multipartForm.post(subUrl, $scope.data);
// 	}
// }]);
