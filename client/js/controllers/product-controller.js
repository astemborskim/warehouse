app.controller('productController', ['$scope', '$resource', function ($scope, $resource) {

	$scope.prod={};
	$scope.prod.currentProd=null;

	var Inventory = $resource('/api/inventory/:id', {}, {update : {method : 'PUT'}});

	getInventory = function(req, res){
		Inventory.query(function (results){
			$scope.inventory=results;
			//console.log(user);
	})}

	$scope.getProductBySKU = function (product){
		//console.log(product);
		$scope.prod.currentProd=product;
		$scope.prod.searchSKU.SKU = product.SKU;
		$scope.prod.NameBySKU = product.Product_Name;
		$scope.prod.DescBySKU = product.Product_Description;
		$scope.prod.quantityBySKU = product.Quantity;
		$scope.prod.locationBySKU = product.Product_Location;
		$scope.prod.hideList = true;
	}

	$scope.getProductByName = function (product){
		$scope.prod.currentProd=product;
		$scope.prod.searchName.Product_Name = product.Product_Name;
		$scope.prod.SKUByName = product.SKU;
		$scope.prod.DescByName = product.Product_Description;
		$scope.prod.quantityByName = product.Quantity;
		$scope.prod.locationByName = product.Product_Location;
		$scope.prod.hideList = true;
	}

	$scope.restoreProduct = function () {
		//console.log($scope.prod.currentProd);
		$scope.prod.searchSKU.SKU = $scope.prod.currentProd.SKU;
		$scope.prod.NameBySKU = $scope.prod.currentProd.Product_Name;
		$scope.prod.DescBySKU = $scope.prod.currentProd.Product_Description;
		$scope.prod.quantityBySKU = $scope.prod.currentProd.Quantity;
		$scope.prod.locationBySKU = $scope.prod.currentProd.Product_Location;
		$scope.prod.hideList = true;
	}

	$scope.verifyUpdate = function(product){

	}

	$scope.updateProduct = function() {
		console.log($scope.prod.currentProd._id);
		var inventory = new Inventory($scope.prod.currentProd);
		//inventory._id = $scope.prod.currentProd._id;
		inventory.$update({id : $scope.prod.currentProd._id}, inventory);
		console.log("updateProduct -  Product Controller");
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

