const express = require('express');
const router = express.Router();
//let authentificator = require('../auth');
// const User = require("../models/user");

// // -> auth
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
let login = require('../../lib/login-module');
//var auth = require('../../lib/login-module/auth');
//const User = require('./models/user')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Flash req (for messages)
const flash = require('connect-flash');

let User = login.User;

passport.use(new LocalStrategy({passReqToCallBack: true},
    function(username, password, done) {
      User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user) {
          return done(null, false, {message: 'Unknown User'});
        }
  
        User.comparePassword(password, user.password, function(err, isMatch){
          if(err) throw err;
          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Invalid password'});
          }
        });
      });
    }));

exports.auth = function ensureAuth(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
      req.flash('error_msg', 'You are not logged in');
      res.redirect('/users/login')
  }
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
 console.log(passport.authenticate());
let test = passport.authenticate(//exports
  'local',
  console.log("In auth test"),
  {
    successRedirect: console.log("Hello hello test"),// /
    failureRedirect:'/users/login',
    failureFlash: true
  }
);


// Register page
router.get('/register', function(req, res) {
  res.render('/login/register');
});

// Login page
router.get('/login', function(req, res) {
  res.render('login/login');
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
      });

      req.flash('success_msg', 'You are registered and now you can login');
      res.redirect('login');
  }

});

// router.post('/login', passport.authenticate(
//   'local',
//   console.log("In auth"),
//   {
//     successRedirect: res.send("hello"),
//     failureRedirect:'/login/users/login',
//     failureFlash: true
//   }
// ), function(req, res) {//login.authTest
//   console.log("In login");
//     res.redirect('/');
//   });

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are successfully logged out');
  res.redirect('/users/login');
});

router.post('/login',passport.authenticate(//exports
  'local',
  console.log("In auth1"),
  {
    successRedirect: '/logout',// /
    failureRedirect:'/logout',//users/login
    failureFlash: true
  }
), (req, res,next)=>{
  res.redirect('/');
  // res.send("Hello");
  // console.log("In login before auth");
  // var handler = passport.authenticate('local')(req, res, function() {
  //   console.log("Another auth");
  //   res.send("Hello from passport");
  //   //res.redirect("/")
  // });
  // handler(req, res, next);
})

// Exports
module.exports = router;
