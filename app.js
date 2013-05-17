
/**
 * Module dependencies.
 */

var express = require('express')
  
  , http = require('http')
  , path = require('path');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function (req,res) {
	res.render('empty');
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
