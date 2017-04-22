var fs = require('fs');

let Clients = require('../../models/clients');
let BusinessOwner = require('../../models/businessOwners');

let viewController = {

    viewBusiness : function(req, res){
        var search = req.query.search;

                if (search){

            BusinessOwner.find({business_name: search}, function(err, business){
                if(err){
                    res.status(500).json({"result":"failure","message":"Database error, purging database!"});
                }else{

                    if (business.length == 0){
                        res.status(404).json({"result":"failure","message":"Businesses not found, purging database!"});
                    }else{
                        res.json({"result":"success","message":"Eureka!! We found it","content": business});
                    }
                }
            });
            }else{
             BusinessOwner.find({}, function(err, business){
                if(err){
                    res.status(500).json({"result":"failure","message":"Database error, purging database!"});
                }else{
                if (business.length == 0){
                        res.status(404).json({"result":"failure","message":"Businesses not found, purging database!"});
                    }else{
                        res.json({"result":"success","message":"Eureka!! We found it","content": business});

                    }
                 }
            });

        }

    },

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
