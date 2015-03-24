app.controller('productController', ['$scope', '$resource',
	function ($scope, $resource) {

	$scope.prod={};

	var Inventory = $resource('/api/inventory', {});

	getInventory = function(req, res){
		Inventory.query(function (results){
			$scope.inventory=results;
			//console.log(user);
	})}

	$scope.getProductBySKU = function (product){

		$scope.prod.searchSKU.SKU = product.SKU;
		$scope.prod.NameBySKU = product.Product_Name;
		$scope.prod.DescBySKU = product.Product_Description;
		$scope.prod.quantityBySKU = product.Quantity;
		$scope.prod.locationBySKU = product.Product_Location;
		$scope.prod.hideList = true;
	}

	$scope.getProductByName = function (product){

		$scope.prod.NameByName = product.Product_Name;
		$scope.prod.DescByName = product.Product_Description;
		$scope.prod.quantityByName = product.Quantity;
		$scope.prod.locationByName = product.Product_Location;
	}

	$scope.showList = function(){
		$scope.prod.hideList = false;
	}

	$scope.orderBySKU = 'SKU';
	$scope.orderByName = 'Product_Name';
	getInventory();
	
	
}]);