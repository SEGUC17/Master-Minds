//Require dependencies 
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');
var viewController = require('./controllers/viewController');
var profileController = require('./controllers/profileController');
<<<<<<< HEAD

//Add routes
router.get('/', homepageController.test);
router.get('/viewbusiness', viewController.viewBusiness);
router.get('/viewservices', viewController.viewServices);
router.get('/viewprofile', profileController.viewProfile);
router.post('/editprofile', profileController.editProfile);

=======
>>>>>>> 25e5814a318ebfac8e08053cf49a166ba4827a4b
var productController = require('./controllers/productController');

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
<<<<<<< HEAD

=======
>>>>>>> 25e5814a318ebfac8e08053cf49a166ba4827a4b

//Export router
module.exports = router;