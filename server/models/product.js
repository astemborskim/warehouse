var mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
	SKU: String,
	Product_Name: String,
	Product_Description: String,
	Quantity: Number,
	Product_Location: String
})