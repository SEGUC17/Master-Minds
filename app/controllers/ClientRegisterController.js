var bcrypt = require('bcryptjs'); // using bycrypt in order to encrypt the password of the clients in the database
var Client = require('../../models/clients');

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) { // encrypting the password
        bcrypt.hash(newUser.password, salt, function(err, hash) { // hashing the password to its encryption
            newUser.password = hash;
            newUser.save(callback); // saving the client to the database
        });
    });
}
