// const mongoose = require('mongoose');
const passport = require('passport');
const { User } = require('../models');

const userController = {};

// Restrict access to root page
userController.home = function (req, res) {
  res.render('index', { user: req.user });
};

// Go to registration page
userController.register = function (req, res) {
  res.render('register');
};

// Post registration
userController.doRegister = function (req, res) {
  // eslint-disable-next-line max-len
  User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password, (err, user) => {
    if (err) {
      return res.render('register', { user });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
    return null;
  });
};

// Go to login page
userController.login = function (req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function (req, res) {
  passport.authenticate('local')(req, res, () => {
    res.redirect('/');
  });
};

// logout
userController.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;
