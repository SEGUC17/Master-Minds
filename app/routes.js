//Require dependencies
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');
var clientsController = require('../app/controllers/clientsController');

//Add routes
router.get('/', homepageController.test);


router.post('/like',function(req,res){
  clientsController.likeBusiness(req,res);
})

router.post('/unlike',clientsController.unlikeBusiness);

router.post('/viewliked',function(req,res){
  clientsController.viewLikedBusinesses(req,res);
  console.log(res);
});

//Export router
module.exports = router;
