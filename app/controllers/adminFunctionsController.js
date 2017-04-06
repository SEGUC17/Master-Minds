//Require dependencies
var fs = require('fs');

let clients = require('../../models/clients');
let businesses = require('../../models/businessOwners');

let adminFunctionsController = {
    
    //Banning User
    banuser:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){
            
        clients.findOne({email: req.param('useremail')}, function(err, user){
            if(err)
                res.send(err);

            if(user){
            user.ban = true;
            user.save(function(err, user){
                if(err)
                    res.send(err);

                res.json({"result": "Success"}); //Confirm success by returning JSON object with result field set to "Success".
            });
            }else{
                res.json({"result": "Failed"}); //Indicates failure to find user by returning JSON object with result field set to "Failed".
            }

        });
        }else{
            res.json({"result": "Failed"}); //Indicates failure if not admin.
        }

        }else{
            res.json({"result": "Failed!"}); //Indicates failure if not admin.
        }
    },
    banbus:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){
            
        businesses.findOne({business_name: req.param('business_name')}, function(err, user){
            if(err)
                res.send(err);

            if(user){
            user.ban = true;
            user.save(function(err, user){
                if(err)
                    res.send(err);

                res.json({"result": "Success"}); //Confirm success by returning JSON object with result field set to "Success".
            });
            }else{
                res.json({"result": "Failed"}); //Indicates failure to find user by returning JSON object with result field set to "Failed".
            }

        });
        
        }else{
            res.json({"result": "Failed"}); //Indicates failure if not admin.
        }
        }else{
            res.json({"result": "Failed!"}); //Indicates failure if not admin.
        }
    },
    viewReportedReviews:function(req,res){
        if(req.isAuthenticated()){

            if (req.user.admin){

            }else{
            res.json({"result": "Failed!"}); //Indicates failure if not admin.
            }

        }else{
            res.json({"result": "Failed!"}); //Indicates failure if not admin.
        }
    }
}

//Export Controller
module.exports = adminFunctionsController;