var express = require('express'); // requires express 

// express.Router() is a method on express
var router = express.Router(); // we are getting a new object called router

var BlogPost = require('../models/blogPosts') // we are requiring our Schema from ../models/bears file


// this creates 
router.use(function(req, res, next) {
	console.log('something is happening!');
	next();
});



router.route('/blogPosts')  // router is a new express worker that will handle all our bear routes
	.post(function(req, res) {  // 

		var u = req.user || "no user"
		console.log("USER MAKING POST:", u);



		var blogPost = new BlogPost(); // calling schema and constructing a new bear
		
		blogPost.author = req.user._id || "56d4b688d3a8e52f48000001";
		blogPost.postTitle = req.body.title;
		blogPost.post = req.body.post;
		blogPost.pic = req.body.pic; // pulling the data from the request (can come from our form or Postman or somewhere else)
		blogPost.date = req.body.date; // same as above

		// .save is a model of mongoose.model.save
		blogPost.save(function(err, blogPost) { //creating a new intance of bear and 
			if(err) {
				//do something
				res.send(err)
			} else {
				//do something
				res.json(blogPost); // res (response) with json (javascript object notation) of the variable bear, 
				                //which is an instance of the New Bear() object constructor function above (line 20) which is located in our bears.js file
			}
		})
	})

	.get(function(req, res) {
		BlogPost.find()
		.populate('author')
		.exec(function(err, blogPosts) { // looking for the collection of all our bear models. Looking for all the objects of bear.
			if(err) {
				return next(err);
			} else {
				res.json(blogPosts)
			}
		})
	});

router.route('/blogPosts/:blogPost_id')  // looking for bears by id in the /bears folder
								 // could be '/bears/:bear_id/:name' if we also wanted to find name
								 // the : tells us it's a param
	.get(function(req, res) {
		// Bear.findById is another mongoose method
		// req.params.bear_id is looking at what we put up in the url
		// req.params.
		BlogPost.findById(req.params.blogPost_id, function (err, blogPost) { // function (err, bear) { .. } is the callback and lets us know if we err or don't 
															     // (which is the var bear we set on line 20)
			if(err) {
				console.log(err); // if there was an err it will be console logged
			} else {
				res.json(blogPost); // if no error. This is the same as line 33 above. We will get a response. 
			}
		})
	})
	.put(function(req, res) {
		BlogPost.findById(req.params.blogPost_id, function(err, blogPost) {
			if(err) {
				console.log(err)
			} else {
				blogPost.post = req.body.post || blogPost.post;
				blogPost.date = req.body.date || blogPost.date;

				blogPost.save(function(err) {
					if(err) {
						console.log(err)
					} else {
						//this can be anything in the () 
						// it returns this value in Postman after you do the put
						res.json({title: "blog post updated"})
					}
				})
			}
		})
	})
	.delete(function(req, res) {
		// ask about the leading _id: (the underscore)
		BlogPost.remove({ _id: req.params.blogPost_id }, function(err, blogPost) {
			if (err) {
				console.log(err)
			} else {
				res.json({title: 'blog post was successfully deleted!'}) // same concept as line 33
			}
		})
	});


module.exports = router; // exports the router

