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
        if(!req.user){
            res.status(200).json({"result":"failure","message":"Unauthorized user detected, purging database!"});
        }else{
        var user = req.user.username;
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
    },

    getEditProfile: function(req, res){
        res.render('edituserprofile');

    },

    editProfile: function(req, res){
        if(!req.user){
            res.status(401).send('Unauthorized user');
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
                res.status(404).send('user not found')
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
                res.status(400).send('An error occured');
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
