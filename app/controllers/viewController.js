var fs = require('fs');

let Clients = require('../../models/clients');
let BusinessOwner = require('../../models/businessOwners');

let viewController = {

    viewBusiness : function(req, res){
        //var search = req.body.business_name;
        var search = "Busi1";
        // var search = undefined;
        if (search){
             var Business = {
    name: String,
    logo: { data: Buffer, contentType: String },
    // rating : [{rating : Number}]
}
            
            BusinessOwner.findOne({business_name: search}, function(err, business){
                if(err){
                    res.send(err);
                }else{
            Business.name = business.business_name;
            Business.logo = business.business_logo;
            console.log(Business);
            res.send(Business);
                }         
            });          
        }
        else{
             var Business = [{
    name: String,
    logo: { data: Buffer, contentType: String },
    // rating : [{rating : Number}]
}]
        BusinessOwner.find({},function(err, business){
            if(err){
                res.send(err);
            }else{
                for(var i = 0; i<business.length ; i++)
                {
            //         for(var j = 0; j<business[i].rating[j];j++){
            //             var temp = rating[j] + temp;
            //         }
            // var avrRating = temp/j;
            
            Business[i].name = business[i].business_name;
            Business[i].logo = business[i].business_logo;
            // Business[i].rating = avrRating;
                }
            res.send(Business);
            }
        });
     }
    },

    viewServices: function(req, res){
        //var business = req.body.business_name;
        BusinessOwner.findOne({business_name: "Busi1"}, function(err, service){
            if(err){
                res.send(err);
            }else{
                console.log(service.services);
                console.log('Hi');
                res.send(service.services);
            }
        });
    }
    

}

//Export Controller
module.exports = viewController;