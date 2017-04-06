var Admin = require('../../models/admins');
var bcrypt = require('bcryptjs');


module.exports.getAdminByUsername = function(username, callback) {
    var query = { username: username };
    Admin.findOne(query, callback);
}

module.exports.getAdminById = function(id, callback) {
    Admin.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}