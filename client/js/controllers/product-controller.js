app.controller('productController', ['$scope', '$resource',
	function ($scope, $resource) {

	var Inventory = $resource('/api/inventory', {});

	getInventory = function(req, res){
		Inventory.query(function (results){
			$scope.inventory=results;
			console.log(JSON.stringify(results));
			//console.log(inventory);
	})}

	$scope.orderBySKU = 'SKU';
	$scope.orderByName = 'Product_Name';
	$scope.viewLimit = 10;

	getInventory();

	$scope.loadSKUSearch = function(){
			$scope.search.Product_Name="";
			$scope.search.SKU = "";
	}
	$scope.loadNameSearch = function(){
			$scope.search.SKU = "";
			$scope.search.Product_Name="";	
	}
}]);