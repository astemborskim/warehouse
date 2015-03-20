
var Product = require('../models/product');
var mongoose = require('mongoose');

module.exports.addProduct = function(req, res){
    // find a user in Mongo with provided username
    console.log(JSON.stringify(req.body));
    Product.findOne({ 'SKU' :  req.param('SKU') }, function(err, product) {
        // In case of any error, return using the done method
        if (err){
            console.log('Error: '+err);
        }
        // already exists
        if (product) {
            console.log('Product with SKU ' + SKU + ' already exists: ');
            req.flash('message','SKU Already Exists');
        } else {
            // if there is no product with that SKU
            // create the user
            var newProduct = new Product();

            // set the user's local credentials
            newProduct.SKU = req.body.SKU;
            newProduct.Product_Name = req.body.prodName;
            newProduct.Product_Description = req.body.prodDesc;
            newProduct.Quantity = req.body.quantity;
            newProduct.Product_Location = req.body.prodLocation;

            // save the user
            newProduct.save(function (err, results) {
                if (err){
                    req.flash('message','Error Adding Product');
                    console.log('Error in Saving new product: '+err);  
                    throw err;  
                }
                req.flash('message','Product add succesful');
                console.log('Product add succesful');    
                res.redirect('/addProd');
            });
        }
    });
}

module.exports.getInventory = function(req, res){
    Product.find({}, function (err, results){
        res.json(results);
    });
}