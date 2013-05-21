

var util = require('util')
, db = require('../db.js');


exports.index = function(req,res) {
	res.render('customer/index',{ title: 'Customer List', customers: db.listCustomers()}); 

};

exports.create = function (req,res) {
	res.render('customer/create');
};

exports.createCustomer = function(req,res){
		
	// console.dir(req.files.picture);

	db.addCustomer({ name: req.body.name, email: req.body.email, telephone: req.body.telephone, 
		picture: req.files.picture.path});


	 var fs = require('fs');

	  // get the temporary location of the file
	  var tmp_path = req.files.picture.path;

	  // set where the file should actually exists - in this case it is in the "images" directory
	 	var target_path = './public/images/' + req.files.picture.name;
	 	
	    // move the file from the temporary location to the intended location
	    fs.rename(tmp_path, target_path, function(err) {
	        if (err) throw err;
	        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
	        fs.unlink(tmp_path, function() {
	            if (err) throw err;
	            res.send('File uploaded to: ' + target_path + ' - ' + req.files.picture.size + ' bytes');
	        });
	});


	res.redirect('/customer');
};




exports.details = function  (req,res) {
	var customer = db.getCustomerById(req.params.id); 
	res.render('customer/details', {customer:customer});
}; 

exports.edit = function  (req,res) {
	var customer = db.getCustomerById(req.params.id); 
	res.render('customer/edit', {customer:customer});
};

exports.editCustomer = function  (req,res) {
	db.updateCustomer({ id:req.params.id, name:req.body.name, email:req.body.email, telephone:req.body.telephone });
	res.redirect('/customer');
};

exports.delete = function (req,res) {
	 db.deleteCustomer(req.params.id); 
	res.redirect('/customer');
};

exports.picture = function  (req,res) {
	var customer = db.getCustomerById( req.params.id); 
	if(req.query.attachment == 'true'){
		res.download(customer.picture); 
	}else {
		res.sendfile(customer.picture);
	}
};













