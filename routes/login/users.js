const express = require('express');
const router = express.Router();
const loginModule = require('../../lib/login-module'); 

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
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validations
  req.checkBody('firstname', 'Firstname is required').notEmpty();
  req.checkBody('lastname', 'Lastname is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // Errors
  var errors = req.validationErrors();
  if (errors) {
    res.render('login/register',{
      errors: errors
    });
  } else {
      var newUser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
      });

      User.createUser(newUser, function(err, user){
        if(err) throw err;
      });

      req.flash('success_msg', 'You are registered and now you can login');
      res.redirect('login');
  }

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

