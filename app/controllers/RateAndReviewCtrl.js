var admins= require('../../models/admins.js');
var clients= require('../../models/clients.js');
var student_schema= require('../../models/businessOwners.js');

exports.Post_Rate_Business= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  business.findOneAndUpdate({'business_name':req_business,'business_rating.username':req.user.username},{'$set': {
        'business_rating.$.rating' : req.body.rating  }},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Post_Rate_Business');
            }
            else if(!found_business)
            {
              var new_rate= {
              "username":req.user.username,
              "rating":req.body.rating
            };
            console.log(new_rate);
              console.log(req.body.rating);
              business.findOneAndUpdate({'business_name':req_business},{"$push":{
              'business_rating':new_rate}
              },function(err,found_business)
                      {
                        if(err)
                        {console.log(err);
                         res.status(401).send("error");
                        }
                        else if(!found_business)
                        {
                          console.log("no business");
                           res.status(401).send("no business");
                        }
                        else
                        {
                          console.log(200);
                           res.status(200).send("added");
                        }
                      });
            }
            else
              {

                console.log(200);
                 res.status(200).send("added");
              }});

}

exports.Post_Rate_Service= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var req_service =req.param('service');
  business.findOneAndUpdate({'business_name':req_business,
  'services.service_name':req_service,
  'services.service_rating.username':req.user.username},{'$set': {
        'services.$.rating' : req.body.rating  }},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Post_Rate_Business');
            }
            else if(!found_business)
            {
              var new_rate= {
              "username":req.user.username,
              "rating":req.body.rating
            };
              business.findOneAndUpdate({'business_name':req_business,'services.service_name':req_service},{"$push":{
              'services.service_rating':new_rate}
              },function(err,found_business)
                      {
                        if(err)
                        {console.log(err);
                         res.status(401).send("error");
                        }
                        else if(!found_business)
                        {
                          console.log(found_business);
                           res.status(401).send("no business");
                        }
                        else
                        {
                          console.log(200);
                           res.status(200).send("added");
                        }
                      });
            }
            else
              {

                console.log(200);
                 res.status(200).send("added");
              }});

}

/*exports.Post_Review_Business = function(req,res)
{ var bus = require('mongoose').model('businesses');
  var business =  new bus();

  var req_business = req.param('business');
  business.find({'business_name':req_business},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Post_Review_Business');
            }
            else if(!found_business||!found_business[0])
            {
              console.log(401);
              res.status(401).send('no business found error happend in the Post_Review_Business');
            }
            else
              {var obj_rev= found_business[0].business_reviews;
                var new_report= {
                  "username":req.uesr.username,
                  "review":req.uesr.review,
                  "report":0
                };
                obj_rev.push(new_report);
                business.save();
                res.console.log(200);
                res.status(200).send('the review should have been added');
              }

          });
}
*/
exports.Post_Rate_Business = function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var new_rate= {
  "username":req.user.username,
  "review":req.body.review,
  "report":0
                };
console.log(new_rate);
              business.findOneAndUpdate({'business_name':req_business},{"$push":{
              'business_reviews':new_rate}
              },function(err,found_business)
                      {
                        if(err)
                        {console.log(err);
                         res.status(401).send("error");
                        }
                        else if(!found_business)
                        {
                          console.log("no business");
                           res.status(401).send("no business");
                        }
                        else
                        {
                          console.log(found_business);
                           res.status(200).send("added");
                        }
                      });
  }


/*
exports.Post_Rate_Service= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var req_service = req.param('service');
  business.find({'business_name':req_business},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Post_Review_Business');
            }
            else if(!found_business||!found_business[0])
            {
              console.log(401);
              res.status(401).send('no business found error happend in the Post_Review_Business');
            }
            else
            { var ffound=0;
              var fname_found=0;
              var obj_ser = found_business[0].services;
                for(var i=0;i<obj_ser.length;i++)
                { var obj_ser_name=obj_ser[i];

                  if(obj_ser_name.service_name==req_service)
                  { var obj_ser_rating= obj_ser[i].service_rating;
                    fname_found=1;
                    for(var j=0;j<obj_ser_rating.length;j++)
                    {
                      var obj_ser_rating_1= obj_ser_rating[i];
                      if(obj_ser_rating_1.username==req.user.username)
                      {
                        ffound=1;
                        obj_ser_rating_1.rating=req.body.rating;
                      }

                    }
                  }
                }
                var new_rate= {
                  "username":req.uesr.username,
                  "rate":req.body.rating
                };
                if(ffound==0&&fname_found==1)
                {
                  obj_ser_rating.push(new_rate);
                  business.save();
                  res.console.log(200);
                  res.status(200).send('the rating should have been added');
                }
                else if(ffound==1&&fname_found==1)
                {
                  business.save();
                  res.console.log(200);
                  res.status(200).send('the rating should have been added');
                }
                else
                {
                  res.console.log(401);
                  res.status(401).send('the service was not found');
                }

            }
          });

}
*/
/*
exports.Post_Review_Service= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var req_service = req.param('service');
  business.find({'business_name':req_business},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Post_Review_Business');
            }
            else if(!found_business||!found_business[0])
            {
              console.log(401);
              res.status(401).send('no business found error happend in the Post_Review_Business');
            }
            else
            { var ffound=0;
              var fname_found=0;
              var obj_ser = found_business[0].services;
                for(var i=0;i<obj_ser.length;i++)
                { var obj_ser_name=obj_ser[i];
                  if(obj_ser_name.service_name==req_service)
                  {fname_found=1;
                    var obj_ser_reviews= obj_ser[i].service_reviews;
                  }
                }
                var new_review= {
                  "username":req.uesr.username,
                  "review":req.body.review
                };
                if(fname_found==1)
                {
                obj_ser_reviews.push(new_review);
                business.save();
                res.console.log(200);
                res.status(200).send('the review should have been added');
                }
                else
                {
                  res.console.log(401);
                  res.status(401).send('service not found');
                }

            }
          });

}*/
exports.Post_Review_Service= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var req_service =req.param('service');
  var new_rate= {
  "username":req.user.username,
  "review":req.body.review,
  "report":0
                };
console.log(new_rate);
              business.findOneAndUpdate({'business_name':req_business,'services.service_name':req_service},{"$push":{
              'services.service_reviews':new_rate}
              },function(err,found_business)
                      {
                        if(err)
                        {console.log(err);
                         res.status(401).send("error");
                        }
                        else if(!found_business)
                        {
                          console.log("no business");
                           res.status(401).send("no business");
                        }
                        else
                        {
                          console.log(found_business);
                           res.status(200).send("added");
                        }
                      });
}
exports.Post_test= function(req,res)
{ /*
  var business1= new business();
    business1.personal_email = "a@a.com";
    business1.password="a" ;
    business1.address ="stree1/home1";
    business1.fullname= "A B C";
    business1.business_name= "business1";
    business1.business_description= "testing 1";
    business1.business_emails=[{email:"email1",description: "for testing" }];  //Business emails with description each
    business1.associated_bank ="GUC";   //The bank the business deals with
    business1.business_website = "www.test.com";
    business1.business_reviews=[{username:"a" , review :"good" ,  Report :"0"}] ;   //Array of reviews and reports
    business1.business_rating = [{username:"a" , rating :"0"}];

    //Business Services
    business1.services=[{

         service_name:"sevice1",
        service_Description:"test service",
          service_price:1000,
            promotion_offer :25,
  service_rating  :[{"username":"a","rating" : "0"}],
service_reviews : [{username:"a",review : "hi"}]

    } ];
    business1.save();*/
    var business = require('mongoose').model('businesses');
/*    var business2= new business();
      business2.personal_email = "a2@a.com";
      business2.password="a" ;
      business2.address ="stree1/home1";
      business2.fullname= "A B C";
      business2.business_name= "business2";
      business2.business_description= "testing 1";
      business2.business_emails=[{email:"email1",description: "for testing" }];  //Business emails with description each
      business2.associated_bank ="GUC";   //The bank the business deals with
      business2.business_website = "www.test.com";
      business2.business_reviews=[{username:"a" , review :"good" ,  Report :"0"}] ;   //Array of reviews and reports
      business2.business_rating = [{username:"a" , rating :"0"}];

      //Business Services
      business2.services=[{

           service_name:"sevice1",
          service_Description:"test service",
            service_price:1000,
              promotion_offer :25,
    service_rating  :[{"username":"a","rating" : "0"}],
  service_reviews : [{username:"a",review : "hi"}]

      } ];
      business2.save();
*/
// var business3= new business();
// business3.personal_email = "a3@a.com";
// business3.password="a" ;
// business3.address ="stree1/home1";
// business3.fullname= "A B C";
// business3.business_name= "business3";
// business3.business_description= "testing 1";
// business3.business_emails=[{email:"email1",description: "for testing" }];  //Business emails with description each
// business3.associated_bank ="GUC";   //The bank the business deals with
// business3.business_website = "www.test.com";
// business3.business_reviews=[{username:"a" , review :"good" ,  Report :"0"}] ;   //Array of reviews and reports
// business3.business_rating = [{username:"a" , rating :"0"}];
//
// //Business Services
// business3.services=[{
//
//      service_name:"sevice1",
//     service_Description:"test service",
//       service_price:1000,
//         promotion_offer :25,
// service_rating  :[{"username":"a","rating" : "0"}],
// service_reviews : [{username:"a",review : "hi"}]
//
// } ];
// business3.save();
// res.send("added")
// }
var business3= new business();
business3.personal_email = "a4@a.com";
business3.password="a" ;
business3.address ="stree1/home1";
business3.fullname= "A B C";
business3.business_name= "business4";
business3.business_description= "testing 1";
business3.business_emails=[{email:"email1",description: "for testing" }];  //Business emails with description each
business3.associated_bank ="GUC";   //The bank the business deals with
business3.business_website = "www.test.com";
business3.business_reviews=[{username:"a" , review :"good" ,  Report :"0"}] ;   //Array of reviews and reports


//Business Services
business3.services=[{

     service_name:"sevice1",
    service_Description:"test service",
      service_price:1000,
        promotion_offer :25,
service_reviews : [{username:"a",review : "hi"}]

} ];
business3.save();
res.send("added")
}
//new stuff from bulldozer
////////////////////////////////////////////////////////////////////////////////////


exports.Get_Rate_Business= function(req,res)
{
   var business = require('mongoose').model('businesses');
   var req_business = req.param('business');

    business.find({'business_name':req_business},function(err,found_business)
    {
        if(err)
        {
          console.log(401);
          res.status(401).send('error happend while looking for the business in the Get_Rate_Business');
        }
        else if(!found_business||!found_business[0])
        {
          console.log(401);
          res.status(401).send('no business found error happend in the Get_Rate_Busines');
        }
        else
        {
          var obj_rate =found_business[0].business_rating;
          if(!obj_rate||!obj_rate[0])
          {
            console.log(401);
            res.status(401).send('no business found error happend in the Get_Rate_Busines');
          }
          else
            {var rate =0;
              for(var i=0;i<obj_rate.length;i++)
              {
                rate+=obj_rate[i].rating;
              }
              console.log(200);
              rate /=obj_rate.length;
              res.status(200).send(rate + "");
            }
          }

});
}


exports.Get_Rate_Service= function(req,res)//tested
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var req_service = req.param('service');
  business.find({'business_name':req_business},function(err,found_business)
    {
        if(err)
        {
          console.log(401);
          res.status(401).send('error happend while looking for the service in the Get_Rate_Service');
        }
        else if(!found_business||!found_business[0])
        {
          console.log(401);
          res.status(401).send('no service found error happend in the Get_Rate_Service');
        }
        else
          {
            var fname_of_service_found=0;
            var output =0;
            var obj_ser = found_business[0].services;
            if(!obj_ser)
            { console.log("no services");
              res.status(401).send("the business has no services yet");
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
              {   console.log(200);
                output/= obj_ser_rating.length;
                console.log(output);
                  res.status(200).send(output+"");
              }
              else
              {
                console.log('service not found');
                  res.status(401).send("service not found");
              }

            }
          }
});
}


exports.Get_Review_Business= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');

   business.find({'business_name':req_business },function(err,found_business)
   {
       if(err)
       {
         console.log(401);
         res.status(401).send('error happend while looking for the business in the Get_Review_Business');
       }
       else if(!found_business||!found_business[0])
       {
         console.log(401);
         res.status(401).send('no business found error happend in the  Get_Review_Business');
       }
       else
       { var reviews = found_business[0].business_reviews;
         var total ="here is the reviews:\n\n";
         if(!reviews||!reviews[0])
         {
           console.log(404);
           res.status(404).send("there is no reviews");

         }
         else{

           for(var i=0;i<reviews.length;i++)
           {
             total+=reviews[i].review;
             total+=", \n";
           }
         console.log(200);
         res.status(200).send(total);
            }
      }

});
}
exports.Get_Review_Service= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var req_service = req.param('service');
  business.find({'business_name':req_business },function(err,found_business)
   {
        if(err)
       {
         console.log(401);
         res.status(401).send('error happend while looking for the service in the Get_Review_Service');
       }
       else if(!found_business||!found_business[0])
       {
         console.log(401);
         res.status(401).send('no service found error happend in the  Get_Review_Service');
       }
       else
       {
              var services = found_business[0].services;
               if(!services||!services[0])
                  {
                    console.log(404);
                    res.status(404).send('no service found');
                  }
               else
                {var total = "here is the reviews:\n\n";
                      var ffound = 0;
                      for(var i = 0;i<services.length;i++)
                          {
                                  if(services[i].service_name==req_service)
                                  {
                                            ffound=1;
                                            var reviews= services[i].service_reviews
                                            if(!reviews||!reviews[0])
                                            {
                                              console.log(404);
                                              res.status(404).send('no reviews found');
                                            }
                                            else
                                            {

                                         for(var j=0;j<reviews.length;j++)
                                         {
                                           total += reviews[j].review+"\n";
                                         }

                                       }
                                  }
                      }

                      if(ffound==1)
                      {
                      console.log(200);
                      res.status(200).send(total);
                       }

                       else
                       {
                         console.log(404);
                         res.status(404).send("no services found");

                       }
                }

       }
});
}
/*exports.Get_Review_Numbered_Business = function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  var req_number =req.param('number_of_reviews_per_page');
  var req_page = req.param('page_number');
   business.find({'business_name':req_business },function(err,found_business)
   {
       if(err)
       {
         console.log(401);
         res.status(401).send('error happend while looking for the business in the Get_Review_Numbered_Business');
       }
       else if(!found_business)
       {
         console.log(401);
         res.status(401).send('no business found error happend in the  Get_Review_Numbered_Business');
       }
       else
       { var reviews = found_business.business_reviews;
         var total ="";
           for(var i=req_page*req_number;i<(req_page*req_number+req_number)&&i<rates.length;i++)
           {
             total.concat(rates[i].review) ;
             total.concat("\n");
           }
         console.log(200);
         res.status(200).send(total);
       };
})*/
/*exports.Get_Review_Numbered_Service = function(req,res)
{
var business = require('mongoose').model('businesses');
  var req_business=req.param('business');
  var req_service = req.param('service');
  var req_number =req.param('number_of_reviews_per_page');
  var req_page = req.param('page_number');
   business.find({'business_name':,services:{'service_name':req_service }},function(err,found_service)
   {
       if(err)
       {
         console.log(401);
         res.status(401).send('error happend while looking for the service in the Get_Review_Numbered_Service');
       }
       else if(!found_service)
       {
         console.log(401);
         res.status(401).send('no service found error happend in the  Get_Review_Numbered_Service');
       }
       else
       { var reviews = found_service.service_reviews;
         var total ="";
           for(var i=req_page*req_number;i<(req_page*req_number+req_number)&&i<rates.length;i++)
           {
             total.concat(rates[i].review) ;
             total.concat("\n");
           }
         console.log(200);
         res.status(200).send(total);
       };
})
*/
exports.Report_Business_Review = function(req,res)
{ var business= require('mongoose').model('businesses');
  var req_business=req.param('business');
  var req_review=req.body.review;
  if(req_review&&req_business)
  business.findOneAndUpdate({'business_name':req_business,'business_reviews.review':req_review},{'$inc':{'business_reviews.$.report':1}},function(err,found_business)
  {
        if(err)
       {
         console.log(401);
         res.status(401).send('Error happend while looking for the business in the Report_Business_Review');
       }
       else if(!found_business)
       {
         console.log(401);
         res.status(401).send('No business found error happend in the Report_Business_Review');
       }
       else
       {
         console.log(200);
         res.status(200).send ("report added");
      }
});
}
