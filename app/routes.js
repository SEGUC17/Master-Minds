//Require dependencies 
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');
var authenticationController = require('./authenticate');
var adminFunctionsController = require('./controllers/adminFunctionsController');
//Add routes
router.get('/', homepageController.test);
router.post('/auth',authenticationController);
router.get('/auth',authenticationController);
router.put('/admin/ban-user/:useremail', adminFunctionsController.banuser);
router.put('/admin/ban-bus/:business_name', adminFunctionsController.banbus);
router.get('/admin/viewReports', adminFunctionsController.viewReportedReviews);

//Export router
module.exports = router;