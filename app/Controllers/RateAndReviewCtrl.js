var admins= require('../Models/admins.js');
var clients= require('../Models/clients.js');
var student_schema= require('../Models/businessOwners.js');

exports.Post_Rate_Business= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  business.findOne({'business_name':req_business},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Post_Review_Business');
            }
            else if(!found_business)
            {
              console.log(401);
              res.status(401).send('no business found error happend in the Post_Review_Business');
            }
            else
              {var obj_rate= found_business.business_rating;
                var new_rate= {
                  "clinet_username":req.uesr.username,
                  "rate":req.body.rating
                };
                var ffound = 0;
                for(var i=0;i<obj_rate.length;i++)
                {
                  if(obj_rate[i].username==new_rate.clinet_username)
                  {ffound=1;
                    obj_rate[i].rate=new_rate.rate;
                  }
                }
                if(ffound==0)
                obj_rate.push(new_rate);
                business.save();
                res.console.log(200);
                res.status(200).send('the rating should have been added');
              }
          });
}

exports.Post_Review_Business = function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.param('business');
  business.findOne({'business_name':req_business},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Post_Review_Business');
            }
            else if(!found_business)
            {
              console.log(401);
              res.status(401).send('no business found error happend in the Post_Review_Business');
            }
            else
              {var obj_rev= found_business.business_reviews_and_reports;
                var new_report= {
                  "clinet_username":req.uesr.username,
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

exports.Post_Rate_Service= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.pram('business');
  var req_service = req.pram('service');
  business.findOne({'business_name':req_business},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Post_Review_Business');
            }
            else if(!found_business)
            {
              console.log(401);
              res.status(401).send('no business found error happend in the Post_Review_Business');
            }
            else
            { var ffound=0;
              var fname_found=0;
              var obj_ser = found_business.services;
                for(var i=0;i<obj_ser.length;i++)
                { var obj_ser_name=obj_ser[i];

                  if(obj_ser_name.service_name==req_service)
                  { var obj_ser_rating= obj_ser[i].service_rating;
                    fname_found=1;
                    for(var j=0;j<obj_ser_rating.length;j++)
                    {
                      var obj_ser_rating_1= obj_ser_rating[i];
                      if(obj_ser_rating_1.clinet_username==req.user.username)
                      {
                        ffound=1;
                        obj_ser_rating_1.rating=req.body.rating;
                      }

                    }
                  }
                }
                var new_rate= {
                  "clinet_username":req.uesr.username,
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

exports.Post_Review_Service= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.pram('business');
  var req_service = req.pram('service');
  business.findOne({'business_name':req_business},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Post_Review_Business');
            }
            else if(!found_business)
            {
              console.log(401);
              res.status(401).send('no business found error happend in the Post_Review_Business');
            }
            else
            { var ffound=0;
              var fname_found=0;
              var obj_ser = found_business.services;
                for(var i=0;i<obj_ser.length;i++)
                { var obj_ser_name=obj_ser[i];
                  if(obj_ser_name.service_name==req_service)
                  {fname_found=1;
                    var obj_ser_reviews= obj_ser[i].service_reviews;
                  }
                }
                var new_review= {
                  "clinet_username":req.uesr.username,
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

}
exports.Post_test= function(req,res)
{ var business1 = require('mongoose').model('businesses');

    business1.personal_email = "a@a.com";
    business1.password="a" ;
    business1.address ="stree1/home1";
    business1.fullname= "A B C";
    business1.business_name= "business1";
    business1.business_description= "testing 1";
    business1.business_emails.push({email:"email1",description: "for testing" });  //Business emails with description each
    business1.associated_bank ="GUC";   //The bank the business deals with
    business1.business_website = "www.test.com";
    business1.business_reviews_and_reports.push({clinet_username:"a" , review :"good" ,  Report :"0"}) ;   //Array of reviews and reports
    business1.business_rating = [{clinet_username:"a" , rating :"0"}];

    //Business Services
    business1.services.push({

         service_name:"sevice1",
        service_Description:"test service",
          service_price:1000,
            promotion_offer :25,
  service_rating  :[{"clinet_username":"a","rating" : "0"}],
service_reviews : [{clinet_username:"a",review : "hi"}]

    }) ;
    business1.save();
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
       else if(!found_business)
       {
         console.log(401);
         res.status(401).send('no business found error happend in the  Get_Review_Business');
       }
       else
       { var reviews = found_business.business_reviews;
         var total ="";
           for(var i=0;i<rates.length;i++)
           {
             total.concat(rates[i].review) ;
             total.concat("\n");
           }
         console.log(200);
         res.status(200).send(total);
       };

})
exports.Get_Review_Service= function(req,res)
{
  var service = require('mongoose').model('service');
  var req_service = req.param('service');
  service.find({'service_name':req_service },function(err,found_service)
   {
        if(err)
       {
         console.log(401);
         res.status(401).send('error happend while looking for the service in the Get_Review_Service');
       }
       else if(!found_service)
       {
         console.log(401);
         res.status(401).send('no service found error happend in the  Get_Review_Service');
       }
       else
       { var reviews = found_service.service_reviews;
         var total ="";
           for(var i=0;i<rates.length;i++)
           {
             total.concat(rates[i].review) ;
             total.concat("\n");
           }
         console.log(200);
         res.status(200).send(total);
       };
})




exports.Get_Review_Numbered_Business = function(req,res)
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
})
exports.Get_Review_Numbered_Service = function(req,res)
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

exports.Report_Business_Review = function(req,res)
{
  businesses.findOne({business_name:req.param('business')},function(err,found_business){
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
       { for(var i=0;i<business.business_reviews.length;i++)
        {
          if(business_reviews[i].review==req.param('review')){
            business_reviews[i].reported++;
          }
       }
  }
  business.save();
};
})
