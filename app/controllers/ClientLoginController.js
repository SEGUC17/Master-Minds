var Client = require('../../models/clients');
var Admin = require('../../models/admins');
var bcrypt = require('bcryptjs');
exports.isLoggedin=function(req,res)
{
  if(req.user)
  {
    res.json({"result":"success","message":"Found user", "content":1});
  }
  else
  {
    res.json({"result":"failure","message":"user not Found","content":0});
  }
}

module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username };
    Client.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
    Client.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {

        //     bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        //         if (err) throw err;
        //         callback(null, isMatch);
        //     });
        // }
        // module.exports.createWork = function(req, res) {
        //     var work = req.body.link;
        //     Client.findOneAndUpdate({ username: req.user.username }, { $push: { works: work } }, function(err, data) {
        //         if (err)
        //             console.log('error ya gehad');
        // });
        // }
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    } // TODO below
