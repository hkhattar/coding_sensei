app.controller('dash_controller', ['$scope','$cookies','$location','$routeParams','belt_factory',

    function($scope,$cookies,$location,$routeParams,belt_factory)
    {
      console.log('dash_controller loaded');
      $scope.dash_user = {};
      belt_factory.checkSesh(data => {
      	if (!data)
      	{
      		$location.url('/index');
      	}  
      	else 
      	{
      		$scope.dash_user = data;
      	}
      	

      									})

  	}
  	
  ]);