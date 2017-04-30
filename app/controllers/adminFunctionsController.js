//Require dependencies
var fs = require('fs');

let clients = require('../../models/clients');
let businesses = require('../../models/businessOwners');

let adminFunctionsController = {
    
    //Banning User
    banuser:function(req,res){
        //console.log(req.user);
        //console.log(req.body);
        if(req.isAuthenticated()){
        if (req.user.admin){
        clients.findOne({username: req.param('username')}, function(err, user){
           // if(err)
           //     res.send(err);

            if(user){
            if(user.ban){
                user.ban = false;
            }else{
                user.ban = true;
            }
            user.save(function(err, user){
                if(err){
                    res.json({"result": "failure","message":"Error in saving banned/unbanned user in database!"});
                }else{
                    res.json({"result": "success"}); //Confirm success by returning JSON object with result field set to "Success".
                }
            });
            }else{
                res.json({"result": "failure","message":"User not found!"}); //Indicates failure to find user by returning JSON object with result field set to "Failed".
            }

        });
        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
            res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },
    onlybanuser:function(req,res){
        //console.log(req.user);
        //console.log(req.body);
        if(req.isAuthenticated()){
        if (req.user.admin){
        clients.findOne({username: req.param('username')}, function(err, user){
           // if(err)
           //     res.send(err);

            if(user){
            
            user.ban = true;
            
            user.save(function(err, user){
                if(err){
                    res.json({"result": "failure","message":"Error in saving banned user in database!"});
                }else{
                    res.json({"result": "success"}); //Confirm success by returning JSON object with result field set to "Success".
                }
            });
            }else{
                res.json({"result": "failure","message":"User not found!"}); //Indicates failure to find user by returning JSON object with result field set to "Failed".
            }

        });
        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
            res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },
    banbus:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){
            
        businesses.findOne({business_name: req.param('business_name')}, function(err, user){
            //if(err)
            //    res.send(err);

            if(user){
            if(user.ban){
                user.ban = false;
            }else{
                user.ban = true;
            }
            
            user.save(function(err, user){
                if(err){
                    res.json({"result": "failure","message":"Error in saving banned/unbanned business in database!"});
                }else{
                    res.json({"result": "success"}); //Confirm success by returning JSON object with result field set to "Success".
                }

            });
            }else{
                res.json({"result": "failure","message":"Business not found!"}); //Indicates failure to find user by returning JSON object with result field set to "Failed".
            }

        });
        
        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }
        }else{
            res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },
    viewReportedReviews:function(req,res){
        //console.log("View reported reviews is requested!");
       if(req.isAuthenticated()){
       if (req.user.admin){ 
        //console.log("View reported reviews is working correctly!");
            businesses.find({'business_reviews.reported': {$gte: 0}},function(err1, arr1){
                businesses.find({'services.service_reviews.reported': {$gte: 0}},function(err2, arr2){

                    var tempreviewsArr1 = arr1.map(function(a) {return a.business_reviews;});
                    var reviewsArr1 = [].concat.apply([], tempreviewsArr1);

                    var tempServicesArr = arr2.map(function(a) {return a.services;});
                    var tempServicesArr2 = [].concat.apply([], tempServicesArr);
                    var tempreviewsArr2 = tempServicesArr2.map(function(a) {return a.service_reviews;});
                    var reviewsArr2 = [].concat.apply([], tempreviewsArr2);
                    //console.log(reviewsArr2);
                    function isNumber(obj) {
                        return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
                    }

                    function filterByReports(review) {
                        if(review)
                        if(review.reported)
                        if (isNumber(review.reported) && review.reported >0) {
                            return true;
                        } 
                            return false; 
                        }

                    var reportsArr1 = reviewsArr1.filter(filterByReports);
                    var reportsArr2 = reviewsArr2.filter(filterByReports);
                    var reportsArr = reportsArr1.concat(reportsArr2);
                    res.json({"result": "success","content":reportsArr});
                    //res.json(reportsArr);
                    });  

            });


       }else{
           res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
       }

       }else{
          res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
       }
    },

    deleteReportedReviews:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){ 

            businesses.findOne({'business_reviews._id': req.param('id')},function(err1, bus1){
            //if(err1)
            //    res.send(err1);
            //console.log(bus1);
            if(!bus1){
                businesses.findOne({'services.service_reviews._id': req.param('id')},function(err2, bus2){
                  //  if(err2)
                  //      res.send(err2);
                    //console.log("Did not find business review: "+req.param('id'));
                    if(bus2){
                        //console.log("Found service review:"+req.param('id'));
                        var i;
                        var flag = false;
                        for(i=0;i<bus2.services.length;i++){
                            for(var j=0;j<bus2.services[i].service_reviews.length;j++){
                                if(bus2.services[i].service_reviews[j]._id == req.param('id')){
                                    bus2.services[i].service_reviews[j].remove();
                                    bus2.save();
                                    res.json({"result": "success"}); //I added the result part
                                    flag = true;
                                    break;
                                }
                            }
                        }

                        if(!flag){
                            res.json({"result": "failure","message":"Could not remove review from review list"});
                        }
                        // businesses.update( 
                        // { username: bus2.username },
                        // { $pull: { "services[i].service_reviews" : { _id : req.param('id') } } },
                        // function removeReviews(err, obj) {
                        //         if(err){

                        //         res.json({"result": "failure","message":"Could not remove review from review list"});
                        //     }else{
                        //         console.log("delete review is working!");
                        //         res.json({"result": "success"}); //I added the result part

                        //         }
                        // });
                    }else{
                      res.json({"result": "failure","message":"Could not find review in reviews list"});

                    }
                    

                });

            }else{  //new ObjectId(req.param('id'))
                    //console.log("Found business review:"+req.param('id'));
                    businesses.update( 
                        { business_name: bus1.business_name },
                        { $pull: { "business_reviews" : { _id : req.param('id')} } },
                        function removeReviews(err, obj) {
                                if(err){
                                res.json({message:"Could not remove review from review list"});
                                }else{
                                res.json({"result": "success"});
                                }
                    });

            }});


        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
           res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },

    deleteOwner:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){

            businesses.findOne({business_name:req.param('business_name')}, function(err, bus){
                //if(err)
                //res.send(err);

                if(bus){
                    bus.remove({business_name:req.param('business_name')});
                    bus.save();
                    res.json({"result": "success"});
                }else{
                    res.json({"result": "failure","message":"Business owner not found!"});
                }
                
            });

        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
           res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },

    getUsers:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){
             clients.find({}, function(err, users){

                if(users){
                    res.json({"result": "success","content":users});
                }else{
                    res.json({"result": "failure","message":"No users registered yet!"});
                }
                
            });

        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
           res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },

    getBusinesses:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){
             businesses.find({}, function(err, busArr){

                if(busArr){
                    res.json({"result": "success","content":busArr});
                }else{
                    res.json({"result": "failure","message":"No businesses registered yet!"});
                }
                
            });

        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
           res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },
    isAdmin:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){
            res.json({"result":"success"});
        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
           res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    }

}

//Export Controller
module.exports = adminFunctionsController;
