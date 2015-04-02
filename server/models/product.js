var mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
	SKU: {type : String, unique : true},
	Product_Name: String,
	Product_Description: String,
	Quantity: Number,
	Product_Location: String
})