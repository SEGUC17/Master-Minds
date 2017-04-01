//dependencies
let clients = ('../../models/clients');

let clientsController = {

    likeBusiness:function(req,res){
      var business_name = req.body.business_name;

      clients.findOne({email:req.session.client.email},function(err,client){
        if(err){
          res.status(404).send();
        }else{
          client.liked.push({business_names:business_name});
          console.log("Business added to favorites");
        }
      });

    }

    unlikeBusiness:function(req,res){
      var business_name = req.body.business_name;

      clients.findOne({email:req.session.client.email},function(err,client){
        if(err){
          res.status(404).send();
          console.log("client not found");
        }else{
          client.liked.pull({business_names:business_name});
          console.log("business unliked");
        }
      });
    }

}
module.exports = clientsController;
