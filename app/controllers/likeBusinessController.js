//dependencies
let clients = require('../../models/clients');

let clientsController = {

    likeBusiness:function(req,res){
      //Get name of business to be liked from the request
      var name = req.body.name;
      //checks if user is logged in
      if(!req.user){
        return res.json({"result":"failure","message":"You need to login"});
      }else{
      //var email = "client1";  Was used for testing

      //Get current user's email
      var email = req.user.email;
      //locates the current client
      clients.findOne({email:email},function(err,client){
        if(err){
          return res.json({"result":"failure","message":"There was a problem"});
        }else{
          if (!client){
            return res.json({"result":"failure","message":"You are not a client"})
          }
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
              return res.json({"result":"failure","message":"There was a problem"});
            }else{
              console.log("Business added to favorites");
              return res.json({"result":"success","message":"successfully added"});
            }
          });

        }
      });
      }

    },

    unlikeBusiness:function(req,res){
      //Get name of business to be unliked from the request
      var business = req.body.name;
      //Get current User's email
      var email = req.user.email;

      //var email = 'client1';  used for testing

      //locate the current client
      clients.findOne({email: email},function(err,client){
        if(err){
          res.status(404).send();
          console.log("client not found");
        }else{
          //Loops on the liked array and filters out the entry with the specified name from the rest
          client.liked = client.liked.filter(function(el){
          //returns the filtered array
          return el.business_names !== business;
          });
          client.save(function(err){
           // Now client is saved, save function runs asynchronously
           console.log('business unliked');
           return res.json({"result":"success","message":"successfully unliked"});
          });
        }
      });
    },

    viewLikedBusinesses:function(req,res){
      //var email = "client1"; used for testing

      //Get current user's email
      var email = req.user.email;
      //locates the current client
      clients.findOne({email:email},function(err,client){
        if(err){
          res.status(404).send;
          console.log("Client not Found");
        }else{
          //Returns the liked array from the found client object
          res.send(client.liked);
          console.log("Liked Businesses Returned");
        }
      });
    }

}
module.exports = clientsController;
