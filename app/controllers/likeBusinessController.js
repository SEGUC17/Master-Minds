//dependencies
let clients = require('../../models/clients');

let clientsController = {

    likeBusiness:function(req,res){
      //Get name of business to be liked from the request
      var name = req.body.name;
      //checks if user is logged in
      if(!req.user){
        res.json({"result":"failure","message":"You need to login"});
      }else{
      //var email = "client1";  Was used for testing

      //Get current user's email
      var email = req.user.email;
      //locates the current client
      clients.findOne({email:email},function(err,client){
        if(err){
          res.json({"result":"failure","message":"There was a problem"});
        }else{
          // checks for duplicate likes
          for(var i = 0; i<client.liked.length;i++){
                if(client.liked[i].business_names == name){
                  res.json({"result":"failure","message":"This Business is already liked"})
                  return;
                }
          };
          //adds the liked business to the liked Array
          client.liked.push({"business_names":name});
          //Updates the client in the database
          client.save(function(err){
            if(err){
              res.json({"result":"failure","message":"There was a problem"});
            }else{
              console.log("Business added to favorites");
              res.json({"result":"success","message":"successfully added"});
            }
          });

        }
      });
      }
          }
        });
      }
    },

    unlikeBusiness:function(req,res){
      //Get name of business to be unliked from the request
      var business = req.body.name;
      //Get current User's email
      var email = req.user.email;

      if (email == null) {
        res.json({"result":"failure","message":"You are not logged in"});
      }else{
        //locate the current client
        clients.findOne({email: email},function(err,client){
            if(err){
              res.json({"result":"failure","message":"Clinet Not Found In Database"});
              console.log("client not found");
          }else{
            //Loops on the liked array and filters out the entry with the specified name from the rest
            client.liked = client.liked.filter(function(el){
            //returns the filtered array
            return el.business_names !== business;
            });
            client.save(function(err){
              if(err){
                res.json({"result":"failure","message":"Business could not be unliked"});
              }else{
                // Now client is saved, save function runs asynchronously
                console.log('business unliked');
                res.json({"result":"success","message":"Business Unliked"});
              }
            });
          }
        });
      }
    },

    viewLikedBusinesses:function(req,res){
      //var email = "client1"; //used for testing

      //Get current user's email
      var email = req.user.email;

      if (email == null) {
          res.json({"result":"failure","message":"You are not logged in"});
      }else{
        //locates the current client
        clients.findOne({email:email},function(err,client){
          if(err){
            res.json({"result":"failure","message":"Client Not In Database"});
            console.log("Client not Found");
          }else{
            //Returns the liked array from the found client object
            res.json({"result":"success","message":"Liked businesses returned","object":client.liked});
            console.log("Liked Businesses Returned");
          }
        });
      }

    }

}
module.exports = clientsController;
