const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Flash req (for messages)
const flash = require('connect-flash');

const User = require('./models/user')

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
      //req.flash('error_msg', 'You are not logged in');
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
exports.test = passport.authenticate(
  'local',
  console.log("In auth"),
  {
    successRedirect: '/',
    failureRedirect:'/users/login',
    failureFlash: true
  }
);
console.log("after test");