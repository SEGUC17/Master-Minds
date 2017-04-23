var fs = require('fs');

let Clients = require('../../models/clients');
let BusinessOwner = require('../../models/businessOwners');

let viewController = {

    viewBusiness : function(req, res){
        var search = req.query.search;
        //search field
                if (search){
            
            BusinessOwner.find({business_name: search}, function(err, business){
                if(err){
                    res.status(500).json({"result":"failure","message":"Database error, purging database!"});
                }else{
                    console.log(business);
                    //checks if empty
                    if (business.length == 0){
                        res.json({"result":"failure","message":"Businesses not found, purging database!"});
                    }else{
                    // returns business
                        res.json({"result":"success","message":"Eureka!! We found it","content": business}); 
                    }
                }         
            });   
                // no search field    
            }else{
                // Find a business
             BusinessOwner.find({}, function(err, business){
                if(err){
                    res.status(500).json({"result":"failure","message":"Database error, purging database!"});
                }else{
                    // Checks not empty
                if (business.length == 0){
                        res.json({"result":"failure","message":"Businesses not found, purging database!"});
                    }else{
                        // Checks for ban and removes from return array
                        for (var i = business.length-1; i >= 0; i--){
                            if(business[i].ban == true){
                                business.splice(i, 1);
                            }else{
                                // Checks for accepted and removes from return array
                            if (business[i].accepted == false){
                            business.splice(i, 1);
                             }
                            }
                        }
                        // returns
                        res.json({"result":"success","message":"Eureka!! We found it","content": business}); 
                        
                    }
                 }         
            });          

        }

    },
// Was planned to be used but was ditched due to redundancy
    viewServices: function(req, res){
        var search = req.query.search;
        BusinessOwner.findOne({business_name: search}, function(err, service){
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