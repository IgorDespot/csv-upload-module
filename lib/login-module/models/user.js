const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 */
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        index:{unique:true}
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    fiware_service:{
        type: String
    },
    fiware_servicepath: {
        type: String
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

/**
 * Creates User with encrypted and salted password
 * 
 * @param {*} newUser - User to be created
 * @param {*} callback
 */
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
/**
 * Get user by username
 * 
 * @param {*} username - Username to be found
 * @param {*} callback 
 */
module.exports.getUserByUsername = function (username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
}

/**
 * Compare if two provided passwords are equal
 * @param {*} userPassword - Password which we compare upon
 * @param {*} hash - Hash value of the password 
 * @param {*} callback 
 */
module.exports.comparePassword = function (userPassword, hash, callback){
  bcrypt.compare(userPassword, hash, function(err, isMatch) {
     if(err) throw err;
     callback(null, isMatch);
  });
}
/**
 * Find user from database by userId
 * @param {*} id  - Id by which a user is returned
 * @param {*} callback 
 */
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}
