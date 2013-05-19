
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , home = require('./routes/home.js')
  , customer = require('./routes/customer.js')
  , path = require('path');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', home.index); 
app.get('/contact', home.contact); 
app.get('/customer', customer.index);
app.get('/customer/create', customer.create); 
app.get('/customer/details/:id', customer.details); 
app.post('/customer/create', customer.createCustomer); 

app.get('/customer/edit/:id', customer.edit); 
app.post('/customer/edit/:id', customer.editCustomer); 




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
