app.controller('homeController', ['$scope', '$resource', function ($scope, $resource) {

	$scope.oneItem ={};
	$scope.showResults = false;
	$scope.noResults = false;
	$scope.myForm = "findForm"; //default tab
	$scope.showFind = true; //defaults
	$scope.showAdd = false;
	$scope.showRemove = false;

	var Item = $resource('/api/item/:id', {'id' : '@SKU'});//, {update : {method : 'PUT'}});

	$scope.findProduct = function(SKU){
	
		var SKU = SKU.toString();
		var item = new Item({'SKU' : SKU});
		item.$get({ id : SKU }, function (results){
			//console.log(results);
			if(results.Product_Name == null){
				$scope.noResults = true;
				console.log('Item with specified SKU does not exist');
			}
			else{
				$scope.showResults = true;
				$scope.noResults = false;
				console.log('Product Found');
				$scope.oneItem.SKU = results.SKU;
				$scope.oneItem.Product_Name = results.Product_Name;
				$scope.oneItem.Product_Description = results.Product_Description;
				$scope.oneItem.Product_Location = results.Product_Location;
				$scope.oneItem.Quantity = results.Quantity;
				
				console.log($scope.oneItem);	
			}
			
		})
	}

	$scope.reset = function(){
		window.location = "../home"
	}

	$scope.findForm = function(){
		console.log('FIND');
		$scope.myForm = "findForm";
		$scope.showFind = true;
		$scope.showAdd = false;
		$scope.showRemove = false;
	}

	$scope.addForm = function(){
		console.log('ADD');
		$scope.myForm = "addForm";
		$scope.showFind = false;
		$scope.showAdd = true;
		$scope.showRemove = false;
	}

	$scope.removeForm = function(){
		console.log('REMOVE');
		$scope.myForm = "removeForm";
		$scope.showFind = false;
		$scope.showAdd = false;
		$scope.showRemove = true;
	}
}]);