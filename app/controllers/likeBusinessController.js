//dependencies
let clients = require('../../models/clients');

let clientsController = {

    likeBusiness:function(req,res){
      //Get name of business to be liked from the request
      var business = req.body.name;

      //var email = "client1";  Was used for testing

      //Get current user's email
      var email = req.user.email;
      //locates the current client
      clients.findOne({email:email},function(err,client){
        if(err){
          res.status(404).send();
        }else{
          //adds the liked business to the liked Array
          client.liked.push({"business_names":business});
          //Updates the client in the database
          client.save(function(err){
            if(err){
              res.status(500).send();
            }else{
              console.log("Business added to favorites");
            }
          });

        }
      });

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
