//Require dependencies
var fs = require('fs');
var bcrypt = require('bcryptjs');

let Clients = require('../../models/clients');

let profileController = {

    viewProfile: function(req, res){
        if(!req.user){
            res.status(401).json({"result":"failure","message":"Unauthorized user detected, purging database!"});
        }else{
        var user = req.user.username;
        Clients.findOne({username: user}, function(err, user){
            if(err){
                res.status().json({"result":"failure","message":"error happened in the database"});
            }else{
                if(user){
                res.json({"result":"success","message":"Found user", "content": user});
            }
            else{
                res.status(404).json({"result":"failure","message":"User not found"});
            }
            }
        });
      }
    },

    getEditProfile: function(req, res){
        res.render('edituserprofile');

    },

    editProfile: function(req, res){
        if(!req.user){
            res.status(401).json({"result":"failure","message":"Unauthorized user detected, purging database!"});
        }
        else{
        var username = req.user.username;
        var password = req.body.password;
        var email = req.body.email;
        var address = req.body.address;
        var phone_number = req.body.phone_number;
        var fullname = req.body.fullname; 
        if(req.file){
             var profile_pic = req.file.filename;
        }

        Clients.findOne({'username': username}, function(err, user){
            if(err){
                console.log(err);
                res.status(404).json({"result":"failure","message":" user not found, purging database!"});
            }else{
               
        bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            user.password = hash;
            user.save(function (err, editUser){
             if(user){
        if(req.file){
            if(user.profile_pic)
        fs.unlink('./public/client/' + user.profile_pic);
        user.profile_pic = profile_pic;
    }
        user.email = email;
        user.address = address;
        user.phone_number = phone_number;
        user.fullName = fullname;
        user.save(function (err, editUser){
            if(err){
                console.log(err);
                res.status(400).json({"result":"failure","message":"An error occured, purging database!"});
            }else{
                res.json({"result":"success","message":"The new data has been save", "content": editUser});
            }
        });
            }else{
                res.status(404).send('user not found');
            }
          });
            
        });
    });
   
            }
        });
    }
}
    
}

//Export Controller
module.exports = profileController;