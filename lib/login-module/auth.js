// -> auth
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user')

exports.auth = function ensureAuth(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    } else {
       req.flash('error_msg', 'You are not logged in');
       res.redirect('/users/login')
    }
  }

  // Passport locStr -> auth
passport.use(new LocalStrategy(
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
  
    // -> auth
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
  
  
    // -> auth
    passport.deserializeUser(function(id, done) {
      User.getUserById(id, function(err, user) {
        done(err, user);
      });
    });
  
exports.test = passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true});