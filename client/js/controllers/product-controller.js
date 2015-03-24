app.controller('productController', ['$scope', '$resource',
	function ($scope, $resource) {

	$scope.prod={};

	var Inventory = $resource('/api/inventory', {});

	getInventory = function(req, res){
		Inventory.query(function (results){
			$scope.inventory=results;
			//console.log(JSON.stringify(results));
	})}

	$scope.getProductBySKU = function (product){

		$scope.prod.NameBySKU = product.Product_Name;
		$scope.prod.DescBySKU = product.Product_Description;
		$scope.prod.quantityBySKU = product.Quantity;
		$scope.prod.locationBySKU = product.Product_Location;
	}

	$scope.getProductByName = function (product){

		$scope.prod.NameByName = product.Product_Name;
		$scope.prod.DescByName = product.Product_Description;
		$scope.prod.quantityByName = product.Quantity;
		$scope.prod.locationByName = product.Product_Location;
	}

	$scope.orderBySKU = 'SKU';
	$scope.orderByName = 'Product_Name';
	getInventory();
	
	
}]);