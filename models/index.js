const mongoose = require('mongoose');

const postSchema = require('./post.js');
const userSchema = require('./user.js');

mongoose.connect('mongodb://localhost/MyBlog');

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Post,
  User,
};
