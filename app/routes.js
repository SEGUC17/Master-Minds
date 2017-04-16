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

// business routes
router.get('/viewRateBusiness/:business', businessController.viewBusinessRating);
router.get('/viewReviewBusiness/:business', businessController.viewBusinessReviews);    // view review of a business
router.get('/', businessController.viewBusiness);
router.get('/service_add', function (req, res) {
    res.render('service_add');
});
router.get('/businessOwner_login', function (req, res) {
    res.render('login');
});
router.get('/subscribe', function (req, res, next) {
    var messages = req.flash('error'); // supply view with the error messages that appeared (if any)
    res.render('subscribe', { messages: messages, hasErrors: messages.length > 0 });
});
router.get('/editboprofile', isLoggedIn, function (req, res, next) {
    var messages = req.flash('error');   // supply error messages to view
    res.render('editprofile', { messages: messages, hasErrors: messages.length > 0 });
});
router.post('/rating/:business', businessController.rateBusiness);  // add new rating to the business
router.post('/reviews/:business', businessController.reviewBusiness);   // add new review to the business
router.post('/reportBusiness/:business', businessController.reportBusinessReview); // report a business' review
// router.post('/editprofile', upload_client.single('profile_pic'), profileController.editProfile);
// router.post('/subscribe', upload.single('business_logo'), businessController.subscribe);
// router.post('/editboprofile', upload.single('business_logo'), businessController.editProfile);
router.post('/reply', businessController.businessPostReply);
router.post('/deletebussines', adminController.deleteBusiness);
router.post('/businessowner_login', businessLoginController.login);

// client routes
router.get('/viewprofile', profileController.viewProfile);
router.get('/editprofile', profileController.getEditProfile);
router.post('/like', function (req, res) {
    likeBusinessController.likeBusiness(req, res);
})
router.post('/unlike', businessController.unlikeBusiness);
router.post('/viewliked', function (req, res) {
    likeBusinessController.viewLikedBusinesses(req, res);
    console.log(res);
});

// service routes
router.get('/viewRateService/:business/:service', serviceController.viewServiceRating);
router.get('/viewReviewService/:business/:service', serviceController.viewServiceReviews); // view review of a service
router.get('/viewservices/:businessname', serviceController.viewServices);
router.get('/detailedProduct/:businessname/:product', serviceController.reportServiceReview);
router.get('/service_edit', function (req, res) {
    res.render('service_edit');
});
router.post('/detailedProduct/:businessname/:product', serviceController.reportServiceReview);
router.post('/service_add', businessController.addService);
router.post('/service_edit', businessController.editService);

// admin routes
router.put('/admin/ban-user/:useremail', adminController.banUser);
router.put('/admin/ban-bus/:business_name', adminController.banBusiness);
router.get('/admin/viewReports', adminController.viewReportedReviews);
router.post('/view_unaccepted_businesses', adminController.viewUnacceptedApplications);
router.post('/accept_application/:business', adminController.acceptApplication);

// advertisement routes
router.get('/viewAdvertisement', advertisementController.viewAdvertisements);
router.post('/advertise/:businessname/:product', advertisementController.addAdvertisment);


// login and register routes
router.get('/register', function (req, res) {
    res.render('register');
});
router.get('/successRedirect', function (req, res) {
    res.send("successRedirect");
});
router.get('/failureRedirect', function (req, res) {
    res.send("failureRedirect");
});
router.get('/login', function (req, res) {
    res.render('login');
});
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
