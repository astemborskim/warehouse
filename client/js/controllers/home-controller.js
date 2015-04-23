app.controller('homeController', ['$scope', '$resource', function ($scope, $resource) {

	$scope.oneItem ={};
	$scope.temp = {};
	$scope.edit = {};
	$scope.showResults = false;
	$scope.noResults = false;
	$scope.myForm = "findForm"; //default tab
	$scope.showFind = true; //defaults
	$scope.showAdd = false;
	$scope.showRemove = false;

	var Item = $resource('/api/item/:id', {}, {update : {method : 'PUT'}});

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

	$scope.addQuantity = function(){
		var currentQuantity = parseInt($scope.oneItem.Quantity);
		var additionalQuantity = parseInt($scope.temp.quantityToAdd);
		var newQuantity = currentQuantity + additionalQuantity;
		$scope.oneItem.Quantity = newQuantity.toString();
		//console.log(newQuantity);
		var item = new Item($scope.oneItem);
			//console.log('oneitem: ' + JSON.stringify($scope.oneItem));
			item.$update({id : $scope.oneItem.SKU}, $scope.oneItem, function (err, result){
	 			if(err){console.log('ERROR!')}
	    	});
	    	$scope.findForm();
	}

	$scope.removeQuantity = function(){
		var currentQuantity = parseInt($scope.oneItem.Quantity);
		var removeQuantity = parseInt($scope.temp.quantityToRemove);
		var newQuantity = currentQuantity - removeQuantity;
		$scope.oneItem.Quantity = newQuantity.toString();
		//console.log(newQuantity);
		var item = new Item($scope.oneItem);
			//console.log('oneitem: ' + JSON.stringify($scope.oneItem));
			item.$update({id : $scope.oneItem.SKU}, $scope.oneItem, function (err, result){
	 			if(err){console.log('ERROR!')}
	    	});
	    	$scope.findForm();
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
		$scope.showFind = true;
		$scope.showAdd = true;
		$scope.showRemove = false;
	}

	$scope.removeForm = function(){
		console.log('REMOVE');
		$scope.myForm = "removeForm";
		$scope.showFind = true;
		$scope.showAdd = false;
		$scope.showRemove = true;
	}

	$scope.editSKU = function(){
		$scope.edit.editSKU = true;
	}

	$scope.editName = function(){
		$scope.edit.editName = true;
	}

	$scope.editDesc = function(){
		$scope.edit.editDesc = true;
	}

	$scope.editLocation = function(){
		$scope.edit.editLocation = true;
	}

	$scope.cancelEdit = function(){
		$scope.edit.editSKU = false;
		$scope.edit.editName = false;
		$scope.edit.editDesc = false;
		$scope.edit.editLocation = false;

	}




}]);