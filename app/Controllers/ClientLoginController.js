var Client = require('../Models/clients.js');
var bcrypt = require('bcryptjs');


module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username };
    Client.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
    Client.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    } // TODO below
module.exports.createWork = function(req, res) {
    var work = req.body.link;
    Client.findOneAndUpdate({ username: req.user.username }, { $push: { works: work } }, function(err, data) {
        if (err)
            console.log('error ya gehad');
    });
}
