const moment = require('moment');
const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/MyBlog');

const postSchema = new Schema({
  headline: String,
  subHeadline: String,
  body: String,
  permalink: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: moment().valueOf(),
  },
  updatedAt: {
    type: Date,
    default: moment().valueOf(),
  },
});

module.exports = mongoose.model('Post', postSchema);
