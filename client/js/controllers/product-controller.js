app.controller('productController', ['$scope', '$resource',
	function ($scope, $resource) {

	var Inventory = $resource('/api/inventory', {});

	Inventory.query(function (results){
		$scope.inventory=results;
		console.log(JSON.stringify(results))
	})
}]);