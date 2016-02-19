var express = require('express');
var app     = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var bearRouter = require ('./routes/bears');

var itsBrokens = 'broken'

var Bear = require('./models/bears');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());




app.use(express.static('public')); //configures to use all the files in the public folder as static files

app.set('view engine', 'ejs');

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
	res.render('index', {title: 'This is my bears app.'})
});

app.get('/bears', function(req, res) {
	Bear.find(function(err, bears) {
		if(err) {
			console.log(err);
		} else {
			res.render('bears', { bears: bears })
		}
	})
});
	

app.get('/about', function(req, res) {
	var data = {};
	data.title = 'About Page';
	data.name = 'Ryan';
	data.time = new Date();

	res.render('about', data);
});


app.use('/api',bearRouter);

app.listen(port, function() {
	console.log('Magic happens on port ' + port)
});


