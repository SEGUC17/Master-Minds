//Require dependencies 
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');
var authenticationController = require('./authenticate');

//Add routes
router.get('/', homepageController.test);
router.post('/auth',authenticationController);
router.get('/auth',authenticationController);
//Export router
module.exports = router;