var moment = require('moment');
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/MyBlog');

var postSchema = new Schema ({
  headline: String,
  subHeadline: String,
  body: String,
  permalink: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: moment().valueOf()
  },
  updatedAt: {
    type: Date,
    default: moment().valueOf()
  }
})

module.exports = mongoose.model('Post', postSchema);
