var express = require('express');
var app     = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var bearRouter = require ('./routes/bears');

var Bear = require('./models/bears');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index', {title: 'This is my bears app.'})
});


app.get('/about', function(req, res) {
	var data = {};
	data.title = 'About Page';
	data.name = 'Ryan';
	data.time = new Date();

	res.render('about', data);
});

app.get('/bears', function(req, res) {
	res.render('bears')
});




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
		})
	})

	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if(err) {
				console.log(err);
			}else{
				res.json(bears);
			}
		})
	})

router.route('/bears/:bear_id')
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function (err, bear) {
			// body...
			if(err) {
				console.log(err);
			}else{
				res.json(bear);
			}
		})
	})
	.put(function(req, res) {
		console.log('we got a put');
		Bear.findById(req.params.bear_id, function(err, bear) {
			if(err) {
				console.log(err)
			} else {
				bear.name = req.body.name ? req.body.name : bear.name;
				bear.age = req.body.age ? req.body.age : bear.age;
				bear.gender = req.body.gender ? req.body.gender : bear.gender;

				bear.save(function(err) {
					if(err) {
						console.log(err)
					} else {
						res.json({title: "bear updated"})
					}
				})

			}
		})
	})
	.delete(function(req, res) {
		Bear.remove({_id: req.params.bear_id}, function(err, bear) {
			if (err) {
				console.log(err)
			} else {
				res.json({ title: 'bear was successfully delted!' })
			}
		})
	});


app.use('/api', bearRouter);



router.route('/bears').post(function (req, res) {
	res.json({ message: 'A post occurred'});
});

router.route('/bears').get(function(req, res) {
	res.json({ message: 'A get occured'});
});




app.listen(port);
console.log('Magic happens on port ' + port);
