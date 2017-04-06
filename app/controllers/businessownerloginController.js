var businesses = require('../../models/businessOwners');
var bcrypt = require('bcryptjs');


module.exports.getUserBypersonal_email = function(personal_email, callback) {
    var query = { personal_email: personal_email };
    businesses.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
    businesses.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}
