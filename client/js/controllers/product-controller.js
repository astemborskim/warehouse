app.controller('productController', ['$scope', '$resource', function ($scope, $resource) {

	$scope.prod={};
	$scope.edited={};
	$scope.prod.currentProd=null;
	$scope.edited.inv=null;
	$scope.prod.hideMessage = true;
	$scope.prod.showEditButton = false;
	$scope.prod.searchType = null;

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
		$scope.edited = $scope.prod;
		$scope.prod.searchType = 'SKU';
		$scope.showEditButton();
	}

	$scope.getProductByName = function (product){
		$scope.prod.currentProd=product;
		$scope.prod.searchName.Product_Name = product.Product_Name;
		$scope.prod.SKUByName = product.SKU;
		$scope.prod.DescByName = product.Product_Description;
		$scope.prod.quantityByName = product.Quantity;
		$scope.prod.locationByName = product.Product_Location;
		$scope.prod.hideList = true;
		$scope.edited = $scope.prod;
		$scope.prod.searchType = 'Name';
		$scope.showEditButton();
	}

	$scope.restoreProduct = function () {
		//console.log(JSON.stringify($scope.prod.currentProd));
		$scope.prod.searchSKU.SKU = $scope.prod.currentProd.SKU;
		$scope.prod.NameBySKU = $scope.prod.currentProd.Product_Name;
		$scope.prod.DescBySKU = $scope.prod.currentProd.Product_Description;
		$scope.prod.quantityBySKU = $scope.prod.currentProd.Quantity;
		$scope.prod.locationBySKU = $scope.prod.currentProd.Product_Location;
		$scope.prod.hideList = true;

	}

	$scope.resetForm = function () {
		$scope.prod.showEditButton = false;
		$scope.prod.hideMessage = true;

		$scope.prod.searchSKU.SKU = null;
		$scope.prod.NameBySKU = null;
		$scope.prod.DescBySKU = null;
		$scope.prod.quantityBySKU = null;
		$scope.prod.locationBySKU = null;

		$scope.prod.searchName = null;
		$scope.prod.SKUByName = null;
		$scope.prod.DescByName = null;
		$scope.prod.quantityByName = null;
		$scope.prod.locationByName = null;

	}

	$scope.setEditbySKU=function(SKU){
		 if(SKU == null){
		 	alert('Please enter a valid SKU...')
		  }
		else{
		$scope.edited.inv = $scope.prod.currentProd;
		$scope.edited.SKU = $scope.prod.searchSKU.SKU;
		$scope.edited.Name = $scope.prod.NameBySKU;
		$scope.edited.Desc = $scope.prod.DescBySKU;
		$scope.edited.quantity = $scope.prod.quantityBySKU;
		$scope.edited.locations = $scope.prod.locationBySKU;
		//console.log('setEdit:' + JSON.stringify($scope.edited.inv));
		$scope.showEdit();}
		
	}

		$scope.setEditbyName=function(SKU){
		 if(SKU == null){
		 	alert('Please enter a valid SKU...')
		  }
		else{
		$scope.edited.inv = $scope.prod.currentProd;
		$scope.edited.SKU = $scope.prod.SKUByName;
		$scope.edited.Name = $scope.prod.searchName.Product_Name;
		$scope.edited.Desc = $scope.prod.DescByName;
		$scope.edited.quantity = $scope.prod.quantityByName;
		$scope.edited.locations = $scope.prod.locationByName;
		//console.log('setEdit:' + JSON.stringify($scope.edited.inv));
		$scope.showEdit();}
		
	}

	$scope.updateProduct = function(SKU) {
		if(SKU == null || SKU == ''){
			alert('SKU must have a value');
		}
			else{
				var editConfirm = confirm('Confirmation: Edit Product?');
				if (editConfirm == true){
			//$scope.edited.inv = $scope.edited.searchSKU;
				$scope.edited.inv.SKU = $scope.edited.SKU;
				$scope.edited.inv.Product_Name = $scope.edited.Name;
				$scope.edited.inv.Product_Description = $scope.edited.Desc;
				$scope.edited.inv.Quantity = $scope.edited.quantity;
				$scope.edited.inv.Product_Location = $scope.edited.locations;
		//console.log('Edited: ' + JSON.stringify($scope.edited.inv));
		//console.log('Not Edited: ' + JSON.stringify($scope.prod.currentProd));
				var inventory = new Inventory($scope.edited.inv);
				inventory.$update({id : $scope.edited.inv._id}, inventory, function (err, result){
	 			if(err){console.log('ERROR!')}
	    		});

				refreshProduct();
 				$scope.prod.showEdit = false;
 				$scope.prod.hideMessage = false;
		}
		else{
		
		}		}
		
	}


	refreshProduct = function(){
		if($scope.prod.searchType == 'SKU'){
			$scope.prod.searchSKU.SKU = $scope.edited.SKU;
			$scope.prod.NameBySKU = $scope.edited.Name;
			$scope.prod.DescBySKU = $scope.edited.Desc;
			$scope.prod.quantityBySKU = $scope.edited.quantity;
			$scope.prod.locationBySKU = $scope.edited.locations;
	   }	
	   else if($scope.prod.searchType == 'Name'){
	   		$scope.prod.SKUByName = $scope.edited.SKU;
			$scope.prod.searchName.Product_Name = $scope.edited.Name;
			$scope.prod.DescByName = $scope.edited.Desc;
			$scope.prod.quantityByName = $scope.edited.quantity;
			$scope.prod.locationByName = $scope.edited.locations;
		}
		else{
			console.log('Valid searchType required');
		}
		
	}

	$scope.showEditButton = function(){
		$scope.prod.showEditButton = true;
	}

	$scope.hideEdit = function(){
		$scope.prod.showEdit = false;
	}
	$scope.showEdit = function(){
		$scope.prod.showEdit = true;
	}

	$scope.showList = function(){
		$scope.prod.hideList = false;
		$scope.prod.hideMessage = true;
		$scope.prod.showEditButton = false;
	}

	$scope.hideMessage= function(){
		$scope.prod.hideMessage = true;
	}

	$scope.orderBySKU = 'SKU';
	$scope.orderByName = 'Product_Name';
	$scope.hideEdit();
	getInventory();

}]);

