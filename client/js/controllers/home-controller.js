app.controller('homeController', ['$scope', '$resource', function ($scope, $resource) {

	var Item = $resource('/api/item/:id', {'id' : '@SKU'});//, {update : {method : 'PUT'}});

	$scope.findProduct = function(SKU){
	
		var SKU = SKU.toString();
		var item = new Item({'SKU' : SKU});
		console.log('item: ' + JSON.stringify(item));
		item.$query({ id : SKU }, function (results){
			console.log(results);
		})
	}
}]);