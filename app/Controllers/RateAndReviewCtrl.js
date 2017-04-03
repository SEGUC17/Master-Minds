var admins= require('./model/admins.js');
var clients= require('./model/clients.js');
var student_schema= require('./model/businessOwners.js');
/*
exports.Get_Rate_Business(req,res)= function(req,res)
{
   var business = require('mongoose').model('businesses');
   var req_business = req.prames.business;

    business.find({'business_name':req_business},function(err,found_business)
    {
        if(err)
        {
          console.log(401);
          res.status(401).send('error happend while looking for the business in the Get_Rate_Business');
        }
        else if(!found_business)
        {
          console.log(401);
          res.status(401).send('no business found error happend in the Get_Rate_Busines');
        }
        else
        { var rates = found_business.business_rating;
          var total =0;
            for(int i=0;i<rates.length;i++)
            {
              total+= rates[i].rating;
            }
          var  total /= rates.length;
          console.log(200);
          res.status(200).send(total);
        });

}
exports.Get_Rate_Service(req,res)= function(req,res)
{
  var business = require('mongoose').model('businesses');

}
exports.Get_Review_Business(req,res)= function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.prames.business;

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
       { var reviews = found_business.business_reviews_and_reports;
         var total ="";
           for(int i=0;i<rates.length;i++)
           {
             total.concat(rates[i].review) ;
             total.concat("\n");
           }
         console.log(200);
         res.status(200).send(total);
       });

}
exports.Get_Review_Service(req,res)= function(req,res)
{

}
exports.Get_Review_Numbered_Business(req,res) = function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.prames.business;
  var req_number =req.prames.number_of_reviews_per_page;
  var req_page = req.prames.page_number;
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
       { var reviews = found_business.business_reviews_and_reports;
         var total ="";
           for(int i=req_page*req_number;i<(req_page*req_number+req_number)&&i<rates.length;i++)
           {
             total.concat(rates[i].review) ;
             total.concat("\n");
           }
         console.log(200);
         res.status(200).send(total);
       });
}
exports.Get_Review_Numbered_Service(req,res) = function(req,res)
{

}
*/
exports.Post_Rate_Business(req,res) = function(req,res)
{
      var business = require('mongoose').model('businesses');
      var req_business = req.prames.business;


      business.findOne({'business_name':req_business,business_rating:{'client_user':res.user.username}},function(err,found_business)
      {
        if(err)
        {
          console.log(401);
          res.status(401).send('error happend while looking for the business in the Get_Rate_Business');
        }


        else if(!found_business)
        {
              business.update({'business_name':req_business},{'$push':{business_rating:{'Clinet_username',req.user.username,'rating':res.body.rate}}},function(err,found_business)
              {
                if(err)
                {
                  console.log(401);
                  res.status(401).send('error happend while looking for the business in the Get_Rate_Business');
                }
                else if(!found_business)
                {
                  console.log(401);
                  res.status(401).send('no business found error happend in the Get_Rate_Busines');
                }
                else
                {   console.log(200);
                    res.status(200).send('your rate has been added');
                }
              });
        }
        else
        {
          business.update({'business_name':req_business,business_rating:{'client_user':res.user.username}},{'$set':{business_rating:{'Clinet_username',req.user.username,'rating':res.body.rate}}},function(err,found_business)
          {
            if(err)
            {
              console.log(401);
              res.status(401).send('error happend while looking for the business in the Get_Rate_Business');
            }
            else if(!found_business)
            {
              console.log(401);
              res.status(401).send('no business found error happend in the Get_Rate_Busines');
            }
            else
            {   console.log(200);
                res.status(200).send('your rate has been added');
            }
          });
        }
      });
    }


exports.Post_Rate_Service(req,res)= function(req,res)
{

}
exports.Post_Review_Business(req,res) = function(req,res)
{
  var business = require('mongoose').model('businesses');
  var req_business = req.prames.business;
  business.update({'business_name':req_business},{'$push':{business_reviews_and_reports:{'Clinet_username',req.user.username,'review':res.body.review,'Report':"null"}}},function(err,found_business)
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
            {   console.log(200);
                res.status(200).send('your review has been added');
            }
          });
}
exports.Post_Review_Service(req,res) = function(req,res)
{
      var business = require('mongoose').model('businesses');
      var review = business.review;
      business.update({'business_name':req_business},{'$push':{'business_rating':res.body.rate}},function(err)
    {

    }
  }
