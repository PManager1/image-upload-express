
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , home = require('./routes/home.js')
  , customer = require('./routes/customer.js')
  , path = require('path');

var app = express();


app.configure(function() {
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());

/*
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/pictures' }));
*/

app.use(express.bodyParser({uploadDir:'./pictures'}));

app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

});



app.get('/copy', function(req, res){
  res.render("customer/create_copy");
});


// we need the fs module for moving the uploaded files
var fs = require('fs');
app.post('/file-upload', function(req, res) {
    // get the temporary location of the file
    var tmp_path = req.files.thumbnail.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/images/' + req.files.thumbnail.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });
});




app.get('/', home.index); 
app.get('/contact', home.contact); 
app.get('/customer', customer.index);
app.get('/customer/create', customer.create); 
app.get('/customer/details/:id', customer.details); 
app.post('/customer/create', customer.createCustomer); 

app.get('/customer/edit/:id', customer.edit); 
app.post('/customer/edit/:id', customer.editCustomer); 

app.delete('/customer/delete/:id', customer.delete); 
// app.del('/customer/delete/:id', customer.deleteCustomer); 


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
