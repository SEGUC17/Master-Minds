//Require dependencies
var fs = require('fs');
var bcrypt = require('bcryptjs');

let Clients = require('../../models/clients');
let Admin = require('../../models/admins');
let profileController = {

  viewProfileWithUsername:function(req,res)
 {console.log(req.user);
   if(req.user){
       Admin.findOne({ username: req.user.username }, function (err, adm) {

         if (adm) {console.log("admin");
           var user = req.param("username");
           Clients.findOne({username: user}, function(err, user){
               if(err){
                   res.status(200).json({"result":"failure","message":"error happened in the database"});
               }else{
                   if(user){
                   res.json({"result":"success","message":"Found user", "content": user});
               }
               else{
                   res.status(200).json({"result":"failure","message":"User not found"});
               }
               }
           });
         }

         else
         {console.log("not admin");
           res.json({"result":"failure","message":"you are not admin"});
         }
     });
   }
     else
     {console.log(" not user admin");
         res.json({"result":"failure","message":"you didn't login"});
     }

   }

 ,
    viewProfile: function(req, res){
        if(!req.user){ // if not logged in return error
            res.status(200).json({"result":"failure","message":"Unauthorized user detected, purging database!"});
        }else{
        var user = req.user.username;
        Clients.findOne({username: user}, function(err, user){ // search for user
            if(err){
                res.status(200).json({"result":"failure","message":"error happened in the database"});
            }else{
                if(user){ // return the data of the found user
                res.json({"result":"success","message":"Found user", "content": user});
            }
            else{ //return error in case of not found
                res.json({"result":"failure","message":"User not found"});
            }
            }
        });
      }
    },

    getEditProfile: function(req, res){ //obsolete code
        res.render('edituserprofile');

    },

    editProfile: function(req, res){
        if(!req.user){ // if not logged in return error
            res.json({"result":"failure","message":"Unauthorized user detected, purging database!"});
        }
        else{ //gathering data from body
        var username = req.user.username;
        var password = req.body.password;
        var email = req.body.email;
        var address = req.body.address;
        var phone_number = req.body.phone_number;
        var fullname = req.body.fullName;
        var dupMail = false; // a variable to check if there is a duplicate mail in the database
        if(req.file){ // if there is a file we will save it 
             var profile_pic = req.file.filename;
        }

        Clients.findOne({'email' : email}, function(err, user ){ //searches users by email
            if(err){
                res.json({"result":"failure","message":"Database error"});
            }else{
                if(user){ //if there is a user found then this email already exists so we set the dupMail to true
                    dupMail = true;
                }
                else{ //else no dupMail
                    dupMail = false;
                }
            
        Clients.findOne({'username': username}, function(err, user){ //search clients by username
            if(err){
                console.log(err);
                res.json({"result":"failure","message":"User not found"});
            }else{

                if (req.body.password){
        bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) { //encrypts new password and saves it to the user
            user.password = hash;
            user.save(function (err, editUser){
             if(user){
        if(req.file){
            if(user.profile_pic)// if there is a file and this user has an existing profile picture delete the old one.
        fs.unlink('./public/businessowner/' + user.profile_pic);
        user.profile_pic = profile_pic;
    }
    if (!dupMail){
        if (req.body.email){
user.email = email; // if the mail is not duplicate save it
        }
        else{
            user.email = user.email;
        }
 
    }
    if (req.body.address){
        user.address = address;
    }
    else{
        user.address = user.address;
    }
    if (req.body.phone_number){
        user.phone_number = phone_number;
    }else{
        user.phone_number = user.phone_number;
    }
    if(req.body.fullName){
        user.fullName = fullname;
    }
    else{
        user.fullName = user.fullName;
    }
        user.save(function (err, editUser){// saves the rest of the data to the database (except for password as it was already saved)
            if(err){
                console.log(err);
                res.status(400).json({"result":"failure","message":"error happened in the database"});
            }else{
                res.json({"result":"success","message":"Found user and updated successfully"});
            }
        });
            }else{
                res.json({"result":"failure","message":"User not found, purging database!"});
            }
          });

        });
    });
                }else{
                     if(user){
        if(req.file){
            if(user.profile_pic)// if there is a file and this user has an existing profile picture delete the old one.
        fs.unlink('./public/businessowner/' + user.profile_pic);
        user.profile_pic = profile_pic;
    }
   if (!dupMail){
        if (req.body.email){
user.email = email; // if the mail is not duplicate save it
        }
        else{
            user.email = user.email;
        }
 
    }
    if (req.body.address){
        user.address = address;
    }
    else{
        user.address = user.address;
    }
    if (req.body.phone_number){
        user.phone_number = phone_number;
    }else{
        user.phone_number = user.phone_number;
    }
    if(req.body.fullName){
        user.fullName = fullname;
    }
    else{
        user.fullName = user.fullName;
    }
        user.save(function (err, editUser){// saves the rest of the data to the database (except for password as it was already saved)
            if(err){
                console.log(err);
                res.status(400).json({"result":"failure","message":"error happened in the database"});
            }else{
                res.json({"result":"success","message":"Found user and updated successfully"});
            }
        });
            }else{
                res.json({"result":"failure","message":"User not found, purging database!"});
            }

                }

            }
        });
        
            }
        });

    }
}

}

//Export Controller
module.exports = profileController;
