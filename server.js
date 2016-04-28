var express    = require('express'); // makes sure the express library can be used in our code otherwise our code will not know what express is
var app        = express();
var bodyParser = require('body-parser'); // body parser is a package and the 'require' says to pull in body-parser into express
var passport   = require('passport');
var mongoose   = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');

// app.get('/', )
var path       = require('path');

// ===============================================================================
// mlab code for heroku   IMPORTANT FOR HEROKU ****************************
var uriUtil = require('mongodb-uri');

var options = {
server:  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
} 
var mongodbUri = process.env.MONGOLAB_URI || "mongodb://localhost/blogPosts";
var mongooseUri = uriUtil.formatMongoose(mongodbUri);



mongoose.connect(mongooseUri, options);
// ===============================================================================


// ===============================================================================
// nodemailer code
var nodemailer = require('nodemailer');
var contact = require('./routes/contact');
// ===============================================================================



var session = require('express-session');
var flash = require('connect-flash');

var blogPostRouter = require ('./routes/blogPosts');

var BlogPost       = require('./models/blogPosts');

var tweetRoutes = require('./routes/tweets');


app.use(bodyParser.urlencoded({ extended: true}));  // app.use is the important part.  It mounts middleware. You need the rest, 'Harold says he doesn't even really understand it'
app.use(bodyParser.json());

// ===============================================================================

app.use(session({
 secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(session({
 cookie: {
   maxAge: 60000
 }
}));
app.use(flash());

require('./config/passport')(passport);
// routes ======================================================================
require('./routes/user.js')(app, passport);


app.use(express.static('public')); //  configures to use all the files in the public folder as static files
// ===============================================================================

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');

  app.use('/static', express.static('static'));
} else {
  // When not in production, enable hot reloading

  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  var watcher = chokidar.watch('./server');
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(function(id) {
        if (/\/server\//.test(id)) delete require.cache[id];
      });
    });
  });
}
// ===============================================================================


// app.use(function (req, res, next) {
// 	var user = req.user || "no user";
// 	// every request we make to our server this is going to check if their is 
// 	// a user
// 	console.log(user);
// 	next();
// });




// ===============================================================================

app.set('view engine', 'ejs');


// ===============================================================================

// app.get connects to our router to our app
// it looks in our index which is represented by our /
// the / is not needed but is a best practice to point at our root directory
// the function parametes are a Request, Response pair
//  


// for index.html in root directory also require path above
/*app.get('/', function(req, res) {
 res.sendFile(path.join(__dirname, 'index.html'));
});*/

app.get('/', function(req, res) {
	var user = req.user || "no user";
	BlogPost.find(function(err, blogPosts) {
		if(err) {
			console.log(err);
		} else {
			res.render('blog', { blogPosts: blogPosts, user: user });
		}
	});
});
	
app.get('/blogPosts', function(req, res) {
	var user = req.user || "no user";
	BlogPost.find(function(err, blogPosts) {
		if(err) {
			console.log(err);
		} else {
			res.render('blogPosts', { blogPosts: blogPosts, user: user });
		}
	});
});

app.get('/about', function(req, res) {

	var user = req.user || "no user";

	var data = {};
	data.title = 'About Page';
	data.name = 'Ryan';
	data.time = new Date();

	res.render('about', {user: user});
});

app.get('/contact', function (req, res) {
	var user = req.user || "no user";

	res.render('contact', {user: user});
});

app.get('/blog', function (req, res) {
	var user = req.user || "no user";

	res.render('blogPosts', {user: user});
});

app.get('/comment', function (req, res) {
	var user = req.user || "no user";

	res.render('comment', {user: user});
});

app.get('/social', function (req,res) {
	var user = req.user || "no user";
	res.render('social', { user: user });
});

app.use('/api', blogPostRouter);  // app.get needs this app.use in order to be used as middleware 

app.use('/api/tweets/', tweetRoutes);

// ===============================================================================
// added this for the nodemailer GET send an email
app.use('/contact', contact);
// ===============================================================================

var port = process.env.PORT || 8080; // this sets the port we are going to use 


// we debug server js i n our terminal
// if this works we will see the string in our terminal
app.listen(port, function() {
	// this prints in our terminal
	// this was the specific terminal we did our nodemon server.js 
	console.log('Magic happens on port ' + port);
});


