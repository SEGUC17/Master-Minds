//Require dependencies
var fs = require('fs');

let clients = require('../../models/clients');
let businesses = require('../../models/businessOwners');

let adminFunctionsController = {
    
    //Banning User
    banuser:function(req,res){
        console.log(req.user);
        console.log(req.body);
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
            res.json({"result": "Failed","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
            res.json({"result": "Failed","message":"You are not logged in!"}); //Indicates failure if not admin.
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
            res.json({"result": "Failed","message":"You are not an admin!"}); //Indicates failure if not admin.
        }
        }else{
            res.json({"result": "Failed","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },
    viewReportedReviews:function(req,res){
       if(req.isAuthenticated()){
       if (req.user.admin){ 

            businesses.find({'business_reviews.reported': {$eq: 0}},function(err, arr1){
            if(err)
                res.send(err);
                businesses.find({'services.service_reviews.reported': {$ne: 0}},function(err, arr2){

                    var tempreviewsArr1 = arr1.map(function(a) {return a.business_reviews;});
                    var reviewsArr1 = [].concat.apply([], tempreviewsArr1);

                    var tempreviewsArr2 = arr2.map(function(a) {return a.services.service_reviews;});
                    var reviewsArr2 = [].concat.apply([], tempreviewsArr2);

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
                    res.json(reportsArr);

                    });

            });


       }else{
           res.json({"result": "Failed","message":"You are not an admin!"}); //Indicates failure if not admin.
       }

       }else{
          res.json({"result": "Failed","message":"You are not logged in!"}); //Indicates failure if not admin.
       }
    },

    deleteReportedReviews:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){ 

            businesses.findOne({'business_reviews._id': req.param('id')},function(err, bus1){
            if(err)
                res.send(err);

            if(!bus1){
                businesses.findOne({'services.service_reviews._id': new ObjectId(req.param('id'))},function(err, bus2){
                    businesses.update( 
                        { username: bus2.username },
                        { $pull: { "services.service_reviews" : { _id : new ObjectId(req.param('id')) } } },
                        function removeReviews(err, obj) {
                                if(err){
                                res.json(500, {"result": "Failed","message":"Could not remove review from review list"});
                                }else{
                                res.json(200, {"result": "Success"}); //I added the result part
                                }
                        });

                });

            }else{
                    businesses.update( 
                        { username: bus1.username },
                        { $pull: { "business_reviews" : { _id : new ObjectId(req.param('id')) } } },
                        function removeReviews(err, obj) {
                                if(err){
                                res.json(500, {message:"Could not remove review from review list"});
                                }else{
                                res.json(200);
                                }
                        });

            }});


        }else{
            res.json({"result": "Failed","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
           res.json({"result": "Failed","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },

    deleteOwner:function(req,res){
        if(req.isAuthenticated()){
        if (req.user.admin){

            businesses.findOne({business_name:req.param('business_name')}, function(err, bus){
                if(err)
                res.send(err);

                bus.remove({business_name:req.param('business_name')});
                bus.save();
                res.json({"result": "Success"});
            });

        }else{
            res.json({"result": "Failed","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
           res.json({"result": "Failed","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    }


}

//Export Controller
module.exports = adminFunctionsController;
