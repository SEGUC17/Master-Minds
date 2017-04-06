//Require dependencies
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');
var viewController = require('./controllers/viewController');
var profileController = require('./controllers/profileController');
var productController = require('./controllers/productController');
var replyController = require('./controllers/replyController');
var Deletebussinesowner= require('./controllers/Deletebussinesowner');


//Add routes
router.get('/', homepageController.test);   //Testing image
router.get('/detailedProduct/:businessname/:product', productController.reportServiceReview);
router.get('/viewAdvertisement', productController.viewAdvertisements);
router.get('/viewbusiness', viewController.viewBusiness);
router.get('/viewservices', viewController.viewServices);
router.get('/viewprofile', profileController.viewProfile);
router.post('/editprofile', profileController.editProfile);
router.post('/detailedProduct/:businessname/:product', productController.addAdvertisment);
router.post('/detailedProduct/:businessname/:product', productController.reportServiceReview);
router.get('/reply', replyController.Post_Reply);
router.get('/deletebussines', Deletebussinesowner.deleteowner);

router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
   });


//Export router
module.exports = router;
