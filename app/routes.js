//Require dependencies 
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');
var productController = require('./controllers/productController');

//Add routes
router.get('/', homepageController.test);   //Testing image
router.get('/detailedProduct/:businessname/:product',productController.reportReview);
router.post('/detailedProduct/:businessname/:product',productController.reportReview);

//Export router
module.exports = router;