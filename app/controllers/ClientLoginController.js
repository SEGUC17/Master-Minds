var Client = require('../../models/clients');
var Admin = require('../../models/admins');
var bcrypt = require('bcryptjs'); // using bycrypt in order to encrypt the passwords of the clients in the database


module.exports.getUserByUsername = function(username, callback) { // searching for a client by a given username
    var query = { username: username };
    Client.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) { // searching for a client by a given id
    Client.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) { // comparing the given password to the clients real password
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    } 
