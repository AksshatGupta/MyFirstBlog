const moment = require('moment');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  admin: Boolean,
  createdAt: {
    type: Date,
    default: moment().valueOf(),
  },
  updatedAt: {
    type: Date,
    default: moment().valueOf(),
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = userSchema;
