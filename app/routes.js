var express = require('express');
var router = express.Router();
var RateAndReviewCtrl = require('./controller/RateAndReviewCtrl.js');
var path = require('path');

/*
router.get('/rating/:business',function(req,res)   // get the  rating of a business
{
      RateAndReviewCtrl.Get_Rate_Business(req,res);
}
);
router.get('/rating/:business/:service',function(req,res) //get rating a of service in the business
{
      RateAndReviewCtrl.Get_Rate_Service(req,res);
}
);
router.get('/reviews/:business',function(req,res) // get all the reviews of the business
{
      RateAndReviewCtrl.Get_Review_Business(req,res);
}
);
router.get('/reviews/:service',function(req,res) // get all the reviews of the business
{
      RateAndReviewCtrl.Get_Review_Service(req,res);
}
);
router.get('/reviews/:number_of_reviews_per_page/:page_number/:business',function(req,res) // get X number of reviews in  page number Y for the business
{
      RateAndReviewCtrl.Get_Review_Numbered_Business(req,res);
}
);
router.get('/reviews/:number_of_reviews_per_page/:page_number/:business/:service',function(req,res) // get X number of reviews in  page number Y for a service in  the business
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Get_Review_Numbered_Service(req,res);
    }
}
);
*/
//post(/rating/breakout);
//post(/rating/paintball);
//post(/rating/prison);
router.post('/rating/:business',function(req,res) // add new rating to the business
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Post_Rate_Business(req,res);
    }

}
);
router.post('/rating/:business/:service',function(req,res) // add new rating to the service
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Post_Rate_Service(req,res);
    }
}
);
router.post('/reviews/:business',function(req,res) // add new review to the business
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Post_Review_Business(req,res);
    }
}
);
router.post('/reviews/:business/:service',function(req,res)// add new review to the service
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Post_Review_Service(req,res);
    }
}
);
