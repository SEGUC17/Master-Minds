//Require dependencies 
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');

//Add routes
router.get('/', homepageController.test);

//Export router
module.exports = router;