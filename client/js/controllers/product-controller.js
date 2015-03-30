app.controller('productController', ['$scope', '$resource', function ($scope, $resource) {

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

		$scope.prod.searchName.Product_Name = product.Product_Name;
		$scope.prod.SKUByName = product.SKU;
		$scope.prod.DescByName = product.Product_Description;
		$scope.prod.quantityByName = product.Quantity;
		$scope.prod.locationByName = product.Product_Location;
		$scope.prod.hideList = true;
	}

	$scope.editProduct = function (product){
		console.log("Product Edited");
	}

	$scope.hideEdit = function(){
		$scope.prod.showEdit = false;
	}
	$scope.showEdit = function(){
		$scope.prod.showEdit = true;
	}

	$scope.showList = function(){
		$scope.prod.hideList = false;
	}

	$scope.orderBySKU = 'SKU';
	$scope.orderByName = 'Product_Name';
	$scope.hideEdit();
	getInventory();
	
	
}]);

