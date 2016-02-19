var express = require('express'); // requires express 

// express.Router() is a method on express
var router = express.Router(); // we are getting a new object called router

var Bear = require('../models/bears') // we are requiring our Schema from ../models/bears file


// this creates 
router.use(function(req, res, next) {
	console.log('something is happening!');
	next();
});



router.route('/bears')  // ?????
	.post(function(req, res) {  // 

		var bear = new Bear(); // calling schema and constructing a new bear

		bear.name = req.body.name; // pulling the data from the request (can come from our form or Postman or somewhere else)
		bear.age = req.body.age; // same as above
		bear.gender = req.body.gender; // same as above

		// .save is a model of mongoose.model.save
		bear.save(function(err, bear) { //creating a new intance of bear and 
			if(err) {
				//do something
				res.send(err)
			} else {
				//do something
				res.json(bear); // res (response) with json (javascript object notation) of the variable bear, 
				                //which is an instance of the New Bear() object constructor function above (line 20) which is located in our bears.js file
			}
		})
	})

	.get(function(req, res) {
		Bear.find(function(err, bears) { // looking for the collection of all our bear models. Looking for all the objects of bear.
			if(err) {
				return next(err);
			} else {
				res.json(bears)
			}
		})
	});

router.route('/bears/:bear_id')  // looking for bears by id in the /bears folder
								 // could be '/bears/:bear_id/:name' if we also wanted to find name
								 // the : tells us it's a param
	.get(function(req, res) {
		// Bear.findById is another mongoose method
		// req.params.bear_id is looking at what we put up in the url
		// req.params.
		Bear.findById(req.params.bear_id, function (err, bear) { // function (err, bear) { .. } is the callback and lets us know if we err or don't 
															     // (which is the var bear we set on line 20)
			if(err) {
				console.log(err); // if there was an err it will be console logged
			} else {
				res.json(bear); // if no error. This is the same as line 33 above. We will get a response. 
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
		// ask about the leading _id: (the underscore)
		Bear.remove({_id: req.params.bear_id}, function(err, bear) {
			if (err) {
				console.log(err)
			} else {
				res.json({title: 'bear was successfully deleted!'}) // same concept as line 33
			}
		})
	});


module.exports = router; // exports the router

