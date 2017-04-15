//Require dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport')
var adminController = require('./controllers/adminController');
var advertisementController = require('./controllers/advertisementController');
var businessController = require('./controllers/businessController');
var profileController = require('./controllers/profileController');
var serviceController = require('./controllers/serviceController');
var adminLoginController = require('./controllers/Auth/adminLoginController');
var authenticate = require('./controllers/Auth/authenticate');
var businessLoginController = require('./controllers/Auth/businessLoginController');
var businessRegisterController = require('./controllers/Auth/businessRegisterController');
var clientLoginController = require('./controllers/Auth/clientLoginController');
var clientRegisterController = require('./controllers/Auth/clientRegisterController');


router.post('/rating/:business', businessController.rateBusiness);  // add new rating to the business

router.post('/reviews/:business', businessController.reviewBusiness);   // add new review to the business

router.get('/viewRateBusiness/:business', businessController.viewBusinessRating);

router.get('/viewRateService/:business/:service', serviceController.viewServiceRating);

router.get('/viewReviewBusiness/:business', businessController.viewBusinessReviews);    // view review of a business

router.get('/viewReviewService/:business/:service', serviceController.viewServiceReviews); // view review of a service

router.post('/reportBusiness/:business', businessController.reportBusinessReview); // report a business' review

//Add routes
router.get('/', businessController.viewBusiness);
router.get('/viewservices/:businessname', serviceController.viewServices);
router.get('/viewprofile', profileController.viewProfile);
router.get('/editprofile', profileController.getEditProfile);
// router.post('/editprofile', upload_client.single('profile_pic'), profileController.editProfile);
router.put('/admin/ban-user/:useremail', adminController.banUser);
router.put('/admin/ban-bus/:business_name', adminController.banBusiness);
router.get('/admin/viewReports', adminController.viewReportedReviews);

router.get('/detailedProduct/:businessname/:product', serviceController.reportServiceReview);
router.get('/viewAdvertisement', advertisementController.viewAdvertisements);
router.post('/advertise/:businessname/:product', advertisementController.addAdvertisment);
router.post('/detailedProduct/:businessname/:product', serviceController.reportServiceReview);
router.post('/reply', businessController.businessPostReply);
router.post('/deletebussines', adminController.deleteBusiness);

//  business_owner _service_add page GET
router.get('/service_add', function (req, res) {
    res.render('service_add');
});


//  business_owner _service_edit  pageG ET
router.get('/service_edit', function (req, res) {
    res.render('service_edit');
});
// Login businessOwner page page GET
router.get('/businessOwner_login', function (req, res) {
    res.render('login');
});

// Login businessOwner  POST
router.post('/businessowner_login', businessLoginController.login);

// business_owner _service_add POST
router.post('/service_add', businessController.addService);

// business_owner _service_edit POST
router.post('/service_edit', businessController.editService);


// Register
router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/successRedirect', function (req, res) {
    res.send("successRedirect");
});

router.get('/failureRedirect', function (req, res) {
    res.send("failureRedirect");
});

// Login
router.get('/login', function (req, res) {
    res.render('login');
});

// Register User
router.post('/register', businessRegisterController.register);

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
    function (req, res) {
        res.redirect('/');
        session.username = req.body.username;
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

router.get('/subscribe', function (req, res, next) {
    var messages = req.flash('error'); // supply view with the error messages that appeared (if any)
    res.render('subscribe', { messages: messages, hasErrors: messages.length > 0 });
});

// router.post('/subscribe', upload.single('business_logo'), businessController.subscribe);

router.get('/editboprofile', isLoggedIn, function (req, res, next) {
    var messages = req.flash('error');   // supply error messages to view
    res.render('editprofile', { messages: messages, hasErrors: messages.length > 0 });
});

// router.post('/editboprofile', upload.single('business_logo'), businessController.editProfile);

router.post('/like', function (req, res) {
    likeBusinessController.likeBusiness(req, res);

})

router.post('/unlike', businessController.unlikeBusiness);

router.post('/viewliked', function (req, res) {
    likeBusinessController.viewLikedBusinesses(req, res);
    console.log(res);
});

router.post('/view_unaccepted_businesses', adminController.viewUnacceptedApplications);
router.post('/accept_application/:business', adminController.acceptApplication);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

router.get('/somepage', function(req, res){
    res.render('somepage');
});

//Export router
module.exports = router;
