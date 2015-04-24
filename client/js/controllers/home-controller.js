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
	$scope.results={};

	var Item = $resource('/api/item/:id', {}, {update : {method : 'PUT'}});

	$scope.findProduct = function(SKU, callback){
	
		var SKU = SKU.toString();
		var item = new Item({'SKU' : SKU});
		item.$get({ id : SKU }, function (results){
			//console.log(results);
			if(results.Product_Name == null){
				$scope.noResults = true;
				console.log('Item with specified SKU does not exist');
				$scope.SKU = null;
				document.getElementById('SKU').focus();
			}
			else{
				$scope.results = results;
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
			callback();
		})
	}

	$scope.updateItem = function(){
		var item = new Item($scope.oneItem);
		console.log('results object :' + JSON.stringify($scope.results));
		item.$update({id : $scope.results.SKU}, $scope.oneItem, function (err, result){
			if(err){ console.log('ERROR: + err')}
		})
		console.log('oneItem object :' + JSON.stringify($scope.oneItem));
		$scope.findProduct($scope.oneItem.SKU, $scope.resetForm);
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
	    	$scope.temp.quantityToAdd = null;
	    	$scope.results.Quantity = $scope.oneItem.Quantity;
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
			$scope.temp.quantityToRemove = null;
	    	$scope.results.Quantity = $scope.oneItem.Quantity;
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

	$scope.cancelSKUEdit = function(){
		$scope.edit.editSKU = false;
		$scope.oneItem.SKU = $scope.results.SKU;
	}

	$scope.cancelNameEdit = function(){
		$scope.edit.editName = false;
		$scope.oneItem.Product_Name = $scope.results.Product_Name;
	}

	$scope.cancelDescEdit = function(){
		$scope.edit.editDesc = false;
		$scope.oneItem.Product_Description = $scope.results.Product_Description;
	}

	$scope.cancelLocationEdit = function(){
		$scope.edit.editLocation = false;
		$scope.oneItem.Product_Location = $scope.results.Product_Location;
	}

	$scope.cancelQuantityEdit = function(){
		$scope.showAdd = false;
		$scope.showRemove = false;
		$scope.temp.quantityToAdd = null;
		$scope.temp.quantityToRemove = null;

	}

	$scope.resetForm = function(){
		$scope.cancelSKUEdit();
		$scope.cancelNameEdit();
		$scope.cancelDescEdit();
		$scope.cancelLocationEdit();
		$scope.cancelQuantityEdit();

	}



}]);