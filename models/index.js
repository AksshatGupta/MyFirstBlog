const mongoose = require('mongoose');

const postSchema = require('./post.js');
const userSchema = require('./user.js');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/MyBlog';

mongoose.connect(MONGODB_URI);

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Post,
  User,
};
