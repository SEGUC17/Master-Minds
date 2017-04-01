//Require dependencies 
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');
var viewController = require('./controllers/viewController');
var profileController = require('./controllers/profileController');

//Add routes
router.get('/', homepageController.test);
router.get('/viewbusiness', viewController.viewBusiness);
router.get('/viewservices', viewController.viewServices);
router.get('/viewprofile', profileController.viewProfile);
router.post('/editprofile', profileController.editProfile);

//Export router
module.exports = router;