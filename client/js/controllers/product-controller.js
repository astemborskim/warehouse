app.controller('productController', ['$scope', '$resource',
	function ($scope, $resource) {

	var Inventory = $resource('/api/inventory', {});

	getInventory = function(req, res){
		Inventory.query(function (results){
			$scope.inventory=results;
			// $scope.skuSearch=results;
			// $scope.nameSearch=results;
			//console.log(JSON.stringify(results));
			//console.log(inventory);
	})}

	$scope.orderBySKU = 'SKU';
	$scope.orderByName = 'Product_Name';
	getInventory();

	$scope.loadSKUSearch = function(){

	}
	$scope.loadNameSearch = function(){
		
	}
}]);