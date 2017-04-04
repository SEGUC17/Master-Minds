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


//new stuff from bulldozer

 router.post('/viewRateBusiness/:business',function(req,res) // view rating of a service
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Get_Rate_Business(req,res);
    }
}
);


 router.post('/viewRateService/:service',function(req,res) // view rating of a service
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Get_Rate_Service(req,res);
    }
}
);

router.post('/viewReviewBusiness/:business',function(req,res) // view review of a business
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Get_Review_Business(req,res);
    }
}
);

router.post('/viewReviewService/:service',function(req,res) // view review of a service
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Get_Review_Service(req,res);
    }
}
);


router.post('/viewReviewNumberedBusiness/:business',function(req,res) // view reviews numbered of a business
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Get_Review_Numbered_Business(req,res);
    }
}
);

router.post('/viewReviewNumberedService/:service',function(req,res) // view reviews numbered of a service
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

router.post('/reportBusiness/:business',function(req,res) // report a business' review
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Report_Business_Review(req,res);
    }
}
);