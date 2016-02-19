var mongoose = require('mongoose');  // this requires the mongoose middleware
var Schema = mongoose.Schema;  // mongoose.Schema is a method on Schema


// new.something is a constructor function

// this is a model for how we are going to make our bears
// the object is made up of keys and values
// name: age: gender: are keys
// String Number String are the data types we will be using
var BearSchema = new Schema({
	name: String,// name, value pairs
	age: Number,// name, value pairs
	gender: String // closing all your objects without a comma ',' is encouraged by some style guides and may be a best practice
});


// we are exporting the mongoose model that we just defined (our bear objects)
// 'Bear' is used when we want to find our BearSchema object constructor function
// Bear.find is an example 
module.exports = mongoose.model('Bear', BearSchema);

// mongo is the database
// mongoose is the framework for using the database




