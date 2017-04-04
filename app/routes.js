var fs = require('fs');
var express = require('express');
var router = express.Router();
var RateAndReviewCtrl = require('./Controllers/RateAndReviewCtrl.js');
var path = require('path');


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

router.get('/test',function(req,res)// add new review to the service
{

      RateAndReviewCtrl.Post_Review_Service(req,res);

}
);

module.exports = router;
