
var Product = require('../models/product');
var mongoose = require('mongoose');

module.exports.addProduct = function(req, res){
    // find a user in Mongo with provided username
    //console.log(JSON.stringify(req.body));
    Product.findOne({ 'SKU' :  req.param('SKU') }, function(err, product) {
        // In case of any error, return using the done method
        if (err){
            console.log('Error: '+err);
        }
        // already exists
        if (product) {
            console.log('Product with SKU already exists: ');
            req.flash('message','SKU Already Exists');
            res.redirect('/addProd');
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
                req.flash('message','Product added successfully!');
                //console.log('Product added successfully!');    
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

module.exports.editInventory = function(req, res){
    Product.update({_id : req.body._id}, req.body, function (err, results){
        if(err){
            req.flash('message', 'Error Updating Product');
            console.log('Error Updating Product: ' + err);
            res.writeHead(404, {'Content-Type': 'text/plain'});
            throw err;
        }
        req.flash('message','Product Updated Successfully!');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end();
    });

};

module.exports.getHome = function(req, res){
    console.log('getHome Reached!');
    res.redirect('/home');
}