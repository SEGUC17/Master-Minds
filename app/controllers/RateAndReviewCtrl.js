var admins= require('../../models/admins.js');
var clients= require('../../models/clients.js');
var student_schema= require('../../models/businessOwners.js');
let businesses = require('../../models/businessOwners');
exports.Post_Rate_Business= function(req,res)
{/**
 * user stroy [2.5]
 * this method is made to make the client able to add ratings to database or modifing it
 * search for business_name in the database
 *  if found  then search whether the rating by this man is in the database or not
 *                 if the rating is in the database just modife it
 *                 else add new one
 *    else send not found to the user
 *    then search whether the rating by this man is in the database or not
 *      if the rating is in the database just modife it
 *       else add new one
 */
  if(req.user){
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  business.findOneAndUpdate({'business_name':req_business,'business_rating.username':req.user.username},{'$set': {
        'business_rating.$.rating' : req.body.rating  }},function(err,found_business)
          {
            if(err)
            {
              
              res.json({"result":"failure","message":"error happened in the database"});
            }
            else if(!found_business)
            {
              var new_rate= {
              "username":req.user.username,
              "rating":req.body.rating
            };
          
            
              business.findOneAndUpdate({'business_name':req_business},{"$push":{
              'business_rating':new_rate}
              },function(err,found_business)
                      {
                        if(err)
                        {
                         res.json({"result":"failure","message":"error happened in the database"});
                        }
                        else if(!found_business)
                        {
                          
                          res.json({"result":"failure","message":"not found"});
                        }
                        else
                        {
                         
                          res.json({"result":"success","message":"your rating has been added"});
                        }
                      });
            }
            else
              {

                
                res.json({"result":"success","message":"your rating has been added"});              }});
              }
        else
        {
           res.json({"result":"failure","message":"please login"});
        }
}

exports.Post_Review_Business = function(req,res)
{/**
 * user stroy [2.4]
 * this method is made to make the client able to add review to database
 *    search for business_name in the database
 *    if found add the review
 *    else send not found to the user
 */
  if(req.user){
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var new_rate= {
  "username":req.user.username,
  "review":req.body.review,
  "report":0
                };

              business.findOneAndUpdate({'business_name':req_business},{"$push":{
              'business_reviews':new_rate}
              },function(err,found_business)
                      {
                        if(err)
                        {
                         res.json({"result":"failure","message":"error happened in the database"});
                        }
                        else if(!found_business)
                        {
                          
                          res.json({"result":"failure","message":"not found"});
                        }
                        else
                        {
                         
                          res.json({"result":"success","message":"your review has been added"});
                        }
                      });

            }
        else
        {
           res.json({"result":"failure","message":"please login"});
        }

  }

exports.Post_Rate_Service=function(req,res)

 {
      /*
      I will get a post request from the detailed product view when the button of the report on
      a certain review is clicked. The product name, the business name and the review content
      will be passed from the view to this function in the product controller.
      This function should search for the review in the business and set the reported flag true.
      */

      /* Adding values to be tested on in the database */
      //   var business = new businesses();
      //   business.personal_email = 'genedymohamed96@gmail.com';
      //   business.business_name = 'breakout';
      //   business.save();
      //   business.services.push({service_name: "room", service_reviews:[{review: "hello" }]});
      //   business.save();
      if(!req.user)
          {
             res.json({"result":"failure","message":"please login"});
            return;
          }
            if (!req.body.rating)
                  return res.json({"result":"failure","message":"enter rating first"});

      var new_rate= {
        "username":req.user.username,
        "rate":req.body.rating

      };


      var ffoundbs = 0;  var ffound = 0;
          businesses.findOne({ business_name: req.param('business') }, function (err, business) {
            if(err)
            {
             
              res.json({"result":"failure","message":"error happened in the database"});
            }
            else if(!business)
            {
              
              res.json({"result":"failure","message":"not found"});
            }
            else{
              for (var i = 0; i < business.services.length; i++) {
              
                  if (business.services[i].service_name == req.param('service')) {
                  ffoundbs=1;
              
                      for (var j = 0; j < business.services[i].service_rating.length; j++) {
                          if (business.services[i].service_rating[j].username == req.user.username) {
                              business.services[i].service_rating[j].rating=req.body.rating;
                              business.save(); ffound=1;



                          }
                      }
                      if(ffound==0)
                      {
                        business.services[i].service_rating.push(new_rate);
                      }

                  }
              }
              if(ffoundbs==0)
              {
                res.json({"result":"failure","message":"not found"});
              }
              else{
              business.save();
              
              res.json({"result":"success","message":"your rating has been added"});
            }
            }
              return;

          });

  }


exports.Post_Review_Service= function(req,res)
{/**
 * user stroy [2.7]
 * this method is made to make the client able to add review to database
 *    search for business_name in the database
 *    if found look inside it for service_name
 *    if found add the review
 *    else send not found to the user
 */
  if(!req.user)
    {
   
    res.json({"result":"failure","message":"please login"});
    return;
    }
  var new_review= {
    "username":req.user.username,
    "review":req.body.review,
    "report":0
  };


  var ffoundbs = 0;
      businesses.findOne({ business_name: req.param('business') }, function (err, business) {
        if(err)
        {
         
          res.json({"result":"failure","message":"error happened in the database"});
        }
        else if(!business)
        {
       
          res.json({"result":"failure","message":"not found"});
        }
        else{
          for (var i = 0; i < business.services.length; i++) {
       
              if (business.services[i].service_name == req.param('service')) {
                for (var j = 0; j<business.services[i].service_reviews.length; j++){
                  if (business.services[i].service_reviews[j].review == req.body.review && business.services[i].service_reviews[j].username == req.user.username){
                     return res.json({"result":"failure","message":"you have posted the same review before"});
                  }
                }
              ffoundbs=1;
       
                  business.services[i].service_reviews.push(new_review);


                      }
                  }


              }

          if(ffoundbs==0)
          {
            res.json({"result":"failure","message":"not found"});
          }
          else{
          business.save();

       
          res.json({"result":"success","message":"your review has been added"});
        }

          return;

      });

}



exports.Get_Rate_Business= function(req,res)
{
  /**
   * user stroy [2.14]
   * this method is made to make the client able to get the rating of particular business_name from the database
   *    search for business_name in the database
   *     if found get all the ratings and add them togther then divide it by the number of ratings and send it to the user
   *    else send not found to the user
   */
   var business = require('mongoose').model('businesses');
   var req_business = req.param('business');

    business.find({'business_name':req_business},function(err,found_business)
    {
        if(err)
        {
          console.log(401);
        res.json({"result":"failure","message":"error happened in the database"});
        }
        else if(!found_business||!found_business[0])
        {
          console.log(401);
          res.json({"result":"failure","message":"not found"});
        }
        else
        {
          var obj_rate =found_business[0].business_rating;
          if(!obj_rate||!obj_rate[0])
          {
          
            res.json({"result":"failure","message":"not found"});
          }
          else
            {var rate =0;
              for(var i=0;i<obj_rate.length;i++)
              {
                rate+=obj_rate[i].rating;
              }
              rate /=obj_rate.length;
              var content = {"rate":rate};
              res.json({"result":"success","message":"sending the rates","content":content});
            }
          }

});
}


exports.Get_Rate_Service= function(req,res)//tested
{/**
 * user stroy [2.14]
 * this method is made to make the client able to get the rating of particular business_name from the database
 *    search for business_name in the database
 *     then look for service_name
 *     if found get all the ratings and add them togther then divide it by the number of ratings and send it to the user
 *    else send not found to the user
 *    else send not found to the user
 */
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var req_service = req.param('service');
  business.find({'business_name':req_business},function(err,found_business)
    { 
        if(err)
        {

          res.json({"result":"failure","message":"error happened in the database"});
        }
        else if(!found_business||!found_business[0])
        {

        res.json({"result":"failure","message":"not found"});
        }
        else
          {
            var fname_of_service_found=0;
            var output =0;
            var obj_ser = found_business[0].services;
            if(!obj_ser)
            {
              res.json({"result":"failure","message":"not found"});
            }
            else{
              for(var i=0;i<obj_ser.length;i++)
              { var obj_ser_name=obj_ser[i];

                if(obj_ser_name.service_name==req_service)
                {

                  var obj_ser_rating= obj_ser[i].service_rating;

                  fname_of_service_found=1;
                  for(var j=0;j<obj_ser_rating.length;j++)
                  {
                    var obj_ser_rating_1= obj_ser_rating[i];


                      output+=obj_ser_rating_1.rating;


                  }
                }
              }
              if(fname_of_service_found==1)
              {  
                output/= obj_ser_rating.length;
                
                var content = {"rate":output};
                res.json({"result":"success","message":"sending the rates","content":content});
              }
              else
              {
               
                  res.json({"result":"failure","message":"not found"});
              }

            }
          }
});
}


exports.Get_Review_Business= function(req,res)
{/**
 * user stroy [2.14]
 * this method is made to make the client able to get the reviews of particular business_name from the database
 *    search for business_name in the database
 *      if found get all the reviews and put them in a json them togther send them to the user
 *    else send not found to the user
 *    
 */
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');

   business.find({'business_name':req_business },function(err,found_business)
   {
       if(err)
       {
         
         res.json({"result":"failure","message":"error happened in the database"});
       }
       else if(!found_business||!found_business[0])
       {
     
        res.json({"result":"failure","message":"not found"});
       }
       else
       { var reviews = found_business[0].business_reviews;
         var total
         if(!reviews||!reviews[0])
         {
          
           res.json({"result":"failure","message":"not found"});

         }
         else{
           total =reviews;

     
                       res.json({"result":"success","message":"sending the reviews","content":total});
            }
      }

});
}
exports.Get_Review_Service= function(req,res)
{
  /**
   * user stroy [2.14]
   * this method is made to make the client able to get the reviews of particular business_name from the database
   *    search for business_name in the database
   *      if found search for the service 
   *      if found get all the reviews and put them in a json them togther send them to the user
   *    else send not found to the user
   *
   */
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var req_service = req.param('service');
  business.find({'business_name':req_business },function(err,found_business)
   {
        if(err)
       {
       
         res.json({"result":"failure","message":"error happened in the database"});       }
       else if(!found_business||!found_business[0])
       {
       
        res.json({"result":"failure","message":"not found"});
       }
       else
       {
              var services = found_business[0].services;
               if(!services||!services[0])
                  {
                 
                    res.json({"result":"failure","message":"not found"});
                  }
               else
                {var total;
                      var ffound = 0;
                      for(var i = 0;i<services.length;i++)
                          {
                                  if(services[i].service_name==req_service)
                                  {
                                            ffound=1;
                                            var reviews= services[i].service_reviews
                                            if(!reviews||!reviews[0])
                                            {
                                           
                                res.json({"result":"failure","message":"not found"});
                                            }
                                            else
                                            {


                                           total = reviews;


                                       }
                                  }
                      }

                      if(ffound==1)
                      {
                   
                      res.json({"result":"success","message":"sending the reviews","content":total});
                       }

                       else
                       {
                    
                        res.json({"result":"failure","message":"not found"});

                       }
                }

       }
});
}
exports.Report_Business_Review = function(req,res)
{ /**
   * user stroy [2.15]
   * this method is made to make the client able to get the reviews of particular business_name from the database
   *    search for business_name in the database
   *    if found search for review that was passed in the body
   *    if found add +1 to the reported part
   *    else send not found
   *    else send not found
   *
   */ 
  if(!req.user)
      {
        res.json({"result":"failure","message":"please login"});
        return;
      }
  var business= require('mongoose').model('businesses');
  var req_business=req.param('business');
  var req_review=req.body.review;
  if(req_review&&req_business)
  business.findOneAndUpdate({'business_name':req_business,'business_reviews.review':req_review},{'$inc':{'business_reviews.$.report':1}},function(err,found_business)
  {
        if(err)
       {
     
         res.json({"result":"failure","message":"error happened in the database"});
       }
       else if(!found_business)
       {
      
         res.json({"result":"failure","message":"not found"});
       }
       else
       {
      
         res.json({"result":"success","message":"your rating has been added"});
      }
});
}
