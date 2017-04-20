var fs = require('fs');

let Clients = require('../../models/clients');
let BusinessOwner = require('../../models/businessOwners');

let viewController = {

    viewBusiness : function(req, res){
        var search = req.query.search;
        console.log(search);

                if (search){
            
            BusinessOwner.find({business_name: search}, function(err, business){
                if(err){
                    res.status(500).send(err);
                }else{
                    console.log(business);
                    if (business.length == 0){
                        res.status(404).send('Business not found');
                    }else{
                        res.send(business); 
                    }
                }         
            });          
            }else{
             BusinessOwner.find({}, function(err, business){
                if(err){
                    res.status(500).send(err);
                }else{
                if (business.length == 0){
                        res.status(404).send('Business not found');
                    }else{
                        res.send(business); 
                    }
                 }         
            });          

        }


        







//__________________________________________________________________________ 
//         //var search = req.body.business_name;
//         // var search = "Busi1";
//         var search = undefined;
//         var Business = [{
//     name: String,
//     logo: { data: Buffer, contentType: String },
//     // rating : [{rating : Number}]
// }]
//         if (search){
            
//             BusinessOwner.find({business_name: search}, function(err, business){
//                 if(err){
//                     res.send(err);
//                 }else{
//             for(var i = 0; i<business.length ; i++)
//                 {
//                     console.log(business);
//             Business[i].name = business[i].business_name;
//             Business[i].logo = business[i].business_logo;
//             // Business[i].rating = avrRating;
//                 }
//             console.log(Business);
//             res.send(Business);
//                 }         
//             });          
//         }
//         else{
             
//         BusinessOwner.find({},function(err, business){
//             if(err){
//                 res.send(err);
//             }else{
//                 // console.log(business);
//                 for(var i = 0; i<business.length ; i++)
//                 {
//             //         for(var j = 0; j<business[i].rating[j];j++){
//             //             var temp = rating[j] + temp;
//             //         }
//             // var avrRating = temp/j;
//             Business.push({name: business[i].business_name});
//             Business.push({logo: business[i].business_logo});
//             console.log(Business);
//             // Business[i].name = business[i].business_name;
//             // Business[i].logo = business[i].business_logo;
//             // console.log(Business);
//             // Business[i].rating = avrRating;
//                 }
//             res.send(Business);
//             }
//         });
//      }
    },

    viewServices: function(req, res){
        var business = req.body.business_name;
        BusinessOwner.findOne({business_name: business}, function(err, service){
            if(err){
                res.send(err);
            }else{
                console.log(service.services);
                console.log('Hi');
                res.json({'result':'success','message':'all services', 'content':service.services});
            }
        });
    }
    

}

//Export Controller
module.exports = viewController;