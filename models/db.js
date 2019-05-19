const mongoose = require('mongoose');

const postSchema = require('./post.js');

mongoose.connect('mongodb://localhost/MyBlog');

module.exports = mongoose.model('Post', postSchema);
