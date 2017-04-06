//Require dependencies
var fs = require('fs');

let Clients = require('../../models/clients');

let profileController = {

    viewProfile: function(req, res){
        // var user = req.session.username;
        var user = "cli";
        Clients.findOne({username: user}, function(err, user){
            if(err){
                res.status().send(err);
            }else{
                if(user){
                res.send(user);
            }
            else{
                res.status(404).send('User not found');
            }
            }
        });
    },

    editProfile: function(req, res){
        var username = req.user.username;
        var password=req.body.password;
        var email = req.body.email;
        var address = req.body.address;
        var profile_pic = req.body.profile_pic;
        var phone_number = req.body.phone_number;
        var fullname = req.body.fullname;

        console.log(password);
        console.log(email);
        // console.log(address);
        // console.log(phone_number);
        // console.log(fullname);
        console.log(req.body);
        

        // var username = req.body.username;

        // var password = "client1";
        // var email = "client1";
        // var address = "client1";
        // var phone_number = "1";
        // var username = "client1";
        // var fullname = "client1";       

        Clients.findOne({'username': username}, function(err, user){
            if(err){
                console.log(err);
                res.status(404).send('Could not find the user');
            }else{
                if(user){
                console.log(user.username);
        user.password = password;
        user.email = email;
        user.address = address;
        user.profile_pic = profile_pic;
        user.phone_number = phone_number;
        user.fullName = fullname;
        console.log(fullname);
        console.log(user);

        user.save(function (err, editUser){
            if(err){
                console.log(err);
                res.status(400).send('There was critical missing data');
            }else{
                res.send(editUser);
            }
        });
            }else{
                res.status(404).send('user not found');
            }
            }
        });
    }
    
}

//Export Controller
module.exports = profileController;