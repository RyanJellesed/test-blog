require('dotenv').config();

var express = require('express');
var router = express.Router();
var Twit = require('twit')

var T = new Twit({
	consumer_key:         process.env.CONSUMER_KEY,
 	consumer_secret:      process.env.CONSUMER_SECRET,
 	access_token:         process.env.ACCESS_TOKEN,
 	access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
 	timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


// all routes prepended with /api/tweets/

router.route('/:keyword')

	.get(function (req, res) {
		var keyword = req.params.keyword;
		//
		//  search twitter for all tweets containing the word 'banana' since July 11, 2011
		//
		T.get('search/tweets', { q: keyword + ' since:2011-07-11', count: 10 }, function(err, data, response) {
		
		
		var myTweetsArr = data.statuses.map(function (tweet) {
			return { 
						text: tweet.text, 
						screen_name: tweet.user.screen_name, 
						created_at: tweet.created_at, 
						profile_image_url: tweet.user.profile_image_url 

					}
		});

			res.json(myTweetsArr)
	})
});

module.exports = router;