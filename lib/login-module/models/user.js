const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User
const UserSchema = mongoose.Schema({
    // ids:{
    //     type: Number,
    //     unique: true
    // },
    username: {
        type: String,
        // index: true,
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

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function (username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.comparePassword = function (userPassword, hash, callback){
  bcrypt.compare(userPassword, hash, function(err, isMatch) {
     if(err) throw err;
     callback(null, isMatch);
  });
}

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}
