const express = require('express');
const router = express.Router();
const loginModule = require('../../lib/login-module');
var registerPostService = require('services/register/rest/post');

// Register page
router.get('/register', function(req, res) {
  res.render('login/register');
});

// Login page
router.get('/login', function(req, res) {
  res.render('login/login');
});

// Register User - POST
router.post('/register', function(req, res) {
  registerPostService(req, res);
});

router.post('/login', loginModule.authTest, function(req, res) {
  res.redirect('/upload');
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are successfully logged out');
  res.redirect('/users/login');
});

// Exports
module.exports = router;

