var express = require('express');
var app     = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var Bear = require('./models/bears');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
	console.log('something is happening!');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')
	.post(function(req, res) {

		var bear = new Bear();
		bear.name = req.body.name;
		bear.age = req.body.age;
		bear.gender = req.body.gender;

		bear.save(function(err, bear) {
			if(err) {
				//do something
				console.log(err);
			}else{
				//do something
				res.json(bear);
			}
		});
	});

app.use('/api', router);

router.route('/bears').post(function (req, res) {
	res.json({ message: 'A post occurred'});
});

router.route('/bears').get(function(req, res) {
	res.json({ message: 'A get occured'});
});




app.listen(port);
console.log('Magic happens on port ' + port);

