var express = require('express');

var router = express.Router();

var Bear = require('../models/bears')


router.use(function(req, res, next) {
	console.log('something is happening!');
	next();
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
				res.send(err)
			} else {
				//do something
				res.json(bear);
			}
		})
	})

	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if(err) {
				return next(err);
			} else {
				res.json(bears)
			}
		})
	});

router.route('/bears/:bear_id')
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function (err, bear) {
			// body...
			if(err) {
				console.log(err);
			} else {
				res.json(bear);
			}
		})
	})
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if(err) {
				console.log(err)
			} else {
				bear.name = req.body.name || bear.name;
				bear.age = req.body.age || bear.age;
				bear.gender = req.body.gender || bear.gender;

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
				res.json({title: 'bear was successfully deleted!'})
			}
		})
	});


module.exports = router;

