//Require dependencies
var fs = require('fs');

let Clients = require('../../models/clients');

let profileController = {

    viewProfile: function(req, res){
        // var user = req.session.username;
        var user = "client1";
        Clients.findOne({username: user}, function(err, user){
            if(err){
                res.send(err);
            }else{
                res.send(user);
            }
        });
    },

    editProfile: function(req, res){
        // var password = req.body.password;
        // var email = req.body.email;
        // var address = req.body.address;
        // var profile_pic = req.body.profile_pic;
        // var phone_number = req.body.phone_number;
        // var username = req.session.username;
        // var fullname = req.body.fullname;

        var password = "client1";
        var email = "client1";
        var address = "client1";
        var phone_number = "1";
        var username = "client1";
        var fullname = "client1";       

        Clients.findOne({username: username}, function(err, user){
            if(err){
                res.send(err);
            }else{
        user.password = password;
        user.email = email;
        user.address = address;
        // user.profile_pic = profile_pic;
        user.phone_number = phone_number;
        user.fullName = fullname;
        console.log(fullname);
        console.log(user);

        user.save(function (err, editUser){
            if(err){
                res.send(err);
            }else{
                res.send(editUser);
            }
        });
            }
        });
    }
    
}

//Export Controller
module.exports = profileController;