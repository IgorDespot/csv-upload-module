const express = require('express');
const router = express.Router();
let authentificator = require('../auth');

// // -> auth
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const User = require('../models/user')

// Register page
router.get('/register', function(req, res) {
  res.render('register');
});

// Login page
router.get('/login', function(req, res) {
  res.render('login');
});

// Register User - POST
router.post('/register', function(req, res) {
 // var name = req.body.name;
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
    res.render('register',{
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
        console.log(user);
      });

      req.flash('success_msg', 'You are registered and now you can login');
      res.redirect('login');
  }

});

// // Passport locStr -> auth
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.getUserByUsername(username, function(err, user){
//       if(err) throw err;
//       if(!user) {
//         return done(null, false, {message: 'Unknown User'});
//       }

//       User.comparePassword(password, user.password, function(err, isMatch){
//         if(err) throw err;
//         if(isMatch) {
//           return done(null, user);
//         } else {
//           return done(null, false, {message: 'Invalid password'});
//         }
//       });
//     });
//   }));

//   // -> auth
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });


//   // -> auth
//   passport.deserializeUser(function(id, done) {
//     User.getUserById(id, function(err, user) {
//       done(err, user);
//     });
//   });

// Passport aut - post

router.post('/login', authentificator.test, function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are successfully logged out');
  res.redirect('/users/login');
});

// Exports
module.exports = router;
