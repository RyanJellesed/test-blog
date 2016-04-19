var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var CommentSchema = new Schema ({
  title: String,
  date: { type: Date, default: Date.now },
  blog: {type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Comment', CommentSchema);