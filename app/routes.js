//Require dependencies
var fs = require('fs');
var express = require('express');
var router = express.Router();
var validator = require('express-validator');
var homepageController = require('./controllers/hompageController');
var likeBusinessController = require('../app/controllers/likeBusinessController');
var BusinessOwner = require('../models/businessOwners');
var Admin = require('../models/admins');
var Client = require('../models/clients');
var multer = require('multer');
var upload = multer({ dest: './public/businessowner' });
var upload_client = multer({ dest: './public/businessowner' });
var viewController = require('./controllers/viewController');
var profileController = require('./controllers/profileController');
var productController = require('./controllers/productController');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/clients');
var UserRegisterController = require('./controllers/ClientRegisterController');
var UserLoginController = require('./controllers/ClientLoginController');
var adminLoginController = require('./controllers/adminLoginController');
var adminFunctionsController = require('./controllers/adminFunctionsController');
var replyController = require('./controllers/replyController');
var Deletebussinesowner = require('./controllers/Deletebussinesowner');
let session = require('express-session');
let businesses = require('../models/businessOwners');
var view_unaccepted_businesses = require('./controllers/view_unaccepted_businesses');
var RateAndReviewCtrl = require('./controllers/RateAndReviewCtrl.js');
var serviceController = require('./controllers/serviceController');
var path = require('path');

//Add routes
router.post('/rating/:business', function (req, res) { RateAndReviewCtrl.Post_Rate_Business(req, res); });//post new rating in the business_rating in the database
router.post('/rating/:business/:service', function (req, res) { RateAndReviewCtrl.Post_Rate_Service(req, res); });//post new rating in the service_rating in the database
router.post('/reviews/:business', function (req, res) { RateAndReviewCtrl.Post_Review_Business(req, res); });//post new review in the business_reviews in the database
router.post('/reviews/:business/:service', function (req, res) { RateAndReviewCtrl.Post_Review_Service(req, res); });//post new review in the service_review in the database
router.get('/viewRateBusiness/:business', function (req, res) { RateAndReviewCtrl.Get_Rate_Business(req, res); });//get the rating of a business from the database
router.get('/viewRateService/:business/:service', function (req, res) { RateAndReviewCtrl.Get_Rate_Service(req, res); });// get the rating of the service from the database
router.get('/viewReviewBusiness/:business', function (req, res) { RateAndReviewCtrl.Get_Review_Business(req, res); });// get the reviews of the business from the database
router.get('/viewReviewService/:business/:service', function (req, res) { RateAndReviewCtrl.Get_Review_Service(req, res); });//get the reviews of the service from the database
router.post('/reportBusiness/:business', function (req, res) { RateAndReviewCtrl.Report_Business_Review(req, res); });//add a new report in the database

//Add routes
router.get('/', homepageController.test);
router.get('/viewbusiness', viewController.viewBusiness);
router.get('/viewservices', viewController.viewServices);
router.get('/viewprofile', profileController.viewProfile);
router.get('/viewprofile/:username', profileController.viewProfileWithUsername);
router.get('/editprofile', profileController.getEditProfile);
router.post('/editprofile', upload_client.single('profile_pic'), profileController.editProfile);

//Admin related routes
router.put('/admin/ban-user/:username', adminFunctionsController.banuser);
router.put('/admin/only-ban-user/:username', adminFunctionsController.onlybanuser);
router.put('/admin/ban-bus/:business_name', adminFunctionsController.banbus);
router.get('/admin/viewReports', adminFunctionsController.viewReportedReviews);
router.put('/admin/deleteReview/:id', adminFunctionsController.deleteReportedReviews);
router.put('/admin/deletebussines/:business_name', adminFunctionsController.deleteOwner);
router.get('/admin/getUsers', adminFunctionsController.getUsers);
router.get('/admin/getBus', adminFunctionsController.getBusinesses);
router.get('/admin/view_unaccepted_businesses', view_unaccepted_businesses.view_unaccepted);
router.put('/admin/accept_application/:business', view_unaccepted_businesses.accept_application);
router.get('/admin/isAdmin', adminFunctionsController.isAdmin);


//Add routes
router.get('/detailedProduct/:businessname/:product', productController.reportServiceReview);
router.get('/viewAdvertisement', productController.viewAdvertisements);
router.get('/viewbusiness', viewController.viewBusiness);
router.post('/advertise/:businessname/:product', productController.addAdvertisment);
router.post('/report/:business/:service', productController.reportServiceReview);
router.post('/reply', replyController.Post_Reply);
router.post('/deletebussines', Deletebussinesowner.deleteOwner);
router.post('/service_add', serviceController.addservice);
router.post('/service_edit', serviceController.editservice);

//Passport

passport.use('local.clientsadmins', new LocalStrategy(
    function (username, password, done) {
        UserLoginController.getUserByUsername(username, function (err, user) { //searching for a matching username in the clients using the clientLoginController
            if (err) throw err;
            if (!user) { // if not found
                adminLoginController.getAdminByUsername(username, function (err, admin) { //searching for a matching username in the admins using the AdminLoginController
                    if (err) throw err;
                    if (!admin) { // if not found
                        BusinessOwner.findOne({ 'personal_email': username }, function (err, owner) { // searching for a matching email in the business owners
                            if (err) {
                                return done(err);
                            }
                            if (!owner) {
                                return done(null, false);
                            }
                            if (!owner.validPassword(password) || owner.ban) { // comparing the password of the business owner and the given password
                                return done(null, false);
                            }
                            return done(null, owner);
                        });
                    }
                    else {
                        if (!adminLoginController.comparePassword(password, admin.password)) { // comparing the password of the admin and the given password
                            return done(null, false);
                        } else {
                            return done(null, admin);
                        }
                    }
                });
            } else {
                UserLoginController.comparePassword(password, user.password, function (err, isMatch) { // comparing the password of the client and the given password
                    if (err) throw err;
                    if (isMatch && !user.ban) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            }
        });
    }));



passport.serializeUser(function (user, done) { // saving the session by the id of the user
    done(null, user.id);
});

passport.deserializeUser(function (id, done) { // return the logged in user using the saved id
    adminLoginController.getAdminById(id, function (err, admin) {
        if (!admin) {
            UserLoginController.getUserById(id, function (err, user) {
                if (!user) {
                    BusinessOwner.findById(id, function (err, owner) {
                        return done(err, owner);
                    });
                } else {
                    return done(err, user);
                }
            });
        } else {
            return done(err, admin);
        }

    });
});
//  business_owner _service_add page GET
router.get('/service_add', function (req, res) {
    res.render('service_add');
});


//  business_owner _service_edit  pageG ET
router.get('/service_edit', function (req, res) {
    res.render('service_edit');
});
// Login businessOwner page page GET
router.get('/businessowner_login', function (req, res) {
    res.render('login');
});

router.get('/successRedirect', function (req, res) {
    res.send("successRedirect");
});
router.get('/failureRedirect', function (req, res) {
    res.send("failureRedirect");
});

// Register Client
router.post('/register', function (req, res) {
    var already_sent_a_json = 0; // this flag is for making sure that this method don't send 2 res.json to the frontend
    var fullName = req.body.fullName;
    var email = req.body.email;
    var username = req.body.username;
    var address = req.body.address;
    var phone_number = req.body.phone_number;
    var password = req.body.password;

    // Validation
    req.checkBody('fullName', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('phone_number', 'Phone Number is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        if (already_sent_a_json == 0) {
            already_sent_a_json = 1
            return res.json({ result: "failure", message: "The email is not valid" }); // this is the only validator error that will be sent from the backend because the others are handled properly in the frontend
        }
    } else {
        var newClient = new User({ // making a new client with the given attributes
            fullName: fullName,
            email: email,
            username: username,
            address: address,
            phone_number: phone_number,
            password: password
        });

        var query1 = { username: newClient.username }; // making sure that the username is unique
        User.findOne(query1, function (err, user) {
            if (err) {
                if (already_sent_a_json == 0) {
                    already_sent_a_json = 1
                    return res.json({ result: "failure", message: "an error occured" });
                }
            } else if (user) {
                if (already_sent_a_json == 0) {
                    already_sent_a_json = 1
                    return res.json({ result: "failure", message: "this username has been already taken" });
                }
            } else { // making sure that the email is unique
                var query2 = { email: newClient.email };
                User.findOne(query2, function (err1, user2) {
                    if (err1) {
                        if (already_sent_a_json == 0) {
                            already_sent_a_json = 1
                            return res.json({ result: "failure", message: "an error occured" });
                        }
                    } else if (user2) {
                        if (already_sent_a_json == 0) {
                            already_sent_a_json = 1
                            return res.json({ result: "failure", message: "this email has been already taken" });
                        }
                    }
                });
            }

        });

        UserRegisterController.createUser(newClient, function (err2, client) { // making a new client in the clientRegisterController
            if (err2) {
                if (already_sent_a_json == 0) {
                    already_sent_a_json = 1
                    return res.json({ result: "failure", message: "an error occured" });
                }
            } else {
                if (already_sent_a_json == 0) {
                    already_sent_a_json = 1
                    return res.json({ result: "success", message: "The registration was successful" });
                }
            }
        });
    }
});

// the login route that will call the passport method from up there and will redirect to successjson if the user has successfully logged in and will redirect to failurejson if the user has failed to log in
router.post('/login',


    passport.authenticate('local.clientsadmins', { successRedirect: '/routes/successjson', failureRedirect: '/routes/failurejson' }));

router.get('/successjson', function (req, res) { // if the user has successfully logged in
    res.json({ result: "success", message: "You have successfully logged in" })
});

router.get('/failurejson', function (req, res) { // if the user has failed to log in
    res.json({ result: "failure", message: "Unknown User" });
});

router.post('/logout', function (req, res) { // the logout route
    req.logout();
    res.json({ result: "success", message: "You have successfully logged out" });
});

router.get('/subscribe', function (req, res, next) {
    res.render('subscribe');
});

router.post('/subscribe', upload.single('business_logo'), function (req, res) {
    console.log('arrived in routesjs subscribe');
    console.log(req.file.filename);
    BusinessOwner.findOne({ 'personal_email': req.body.personal_email }, function (err, owner) { //check that email is unique
        if (err) {
            return res.status(400).send('An error occured.');
        }
        if (owner) {
            fs.unlink('./public/businessowner/' + req.file.filename); // same as **
            return res.status(400).send('Personal email already in use.');
        }
        BusinessOwner.findOne({ 'business_name': req.body.business_name }, function (err, owner) { // check that business name is unique
            if (err) {
                return res.json({ result: 'failed', message: 'error' });
            }
            if (owner) {
                fs.unlink('./public/businessowner/' + req.file.filename); //  same as **
                return res.status(400).send('Business name already in use.');
            }
            var newOwner = new BusinessOwner(); // insert data into database
            newOwner.personal_email = req.body.personal_email;
            newOwner.password = newOwner.encryptPassword(req.body.password);
            newOwner.business_name = req.body.business_name;
            newOwner.fullName = req.body.fullName;
            newOwner.business_description = req.body.business_description;
            newOwner.business_logo = req.file.filename;
            var a = req.body.business_emails;
            var arr = a.split(',');
            for (i = 0; i < arr.length; i++) {
                newOwner.business_emails.push({ email: arr[i] });
            }
            newOwner.address = req.body.address;
            newOwner.associated_bank = req.body.associated_bank;
            newOwner.business_website = req.body.business_website;
            newOwner.business_reviews_and_reports = [];
            newOwner.rating = [];
            newOwner.accepted = false; // shows that this business is pending approval by the admin to be shown on the directory
            newOwner.ban = false;
            console.log(newOwner);
            newOwner.save(function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(400).send('An error occured.');
                }
            });
        });
    });
});

router.get('/editboprofile', function (req, res) {
    res.render('editprofile');
});

router.post('/editboprofile', upload.single('business_logo'), function (req, res) {
    console.log(req.user.personal_email);
    BusinessOwner.findOne({ 'personal_email': req.user.personal_email }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(400).send('An error occured.');
        }
        if (req.body.new_email && req.body.business_name) {
            BusinessOwner.findOne({ 'personal_email': req.body.new_email }, function (err, owner) {
                if (err) {
                    console.log(err);
                    return res.status(400).send('An error occured.');
                }
                if (owner) {
                    return res.status(400).send('New email already in use.');
                }
                user.personal_email = req.body.new_email;
                BusinessOwner.findOne({ 'business_name': req.body.business_name }, function (err, owner) {
                    if (err) {
                        console.log(err);
                        return res.status(400).send('An error occured.');
                    }
                    if (owner) {
                        return res.status(400).send('New business name already in use.');
                    }
                    user.business_name = req.body.business_name;
                    if (req.body.new_password)
                        user.new_password = user.encryptPassword(req.body.new_password);
                    if (req.body.fullName)
                        user.fullName = req.body.fullName;
                    if (req.body.address)
                        user.address = req.body.address;
                    if (req.body.business_emails) {
                        user.business_emails = [];
                        var a = req.body.business_emails;
                        var arr = a.split(',');
                        for (i = 0; i < arr.length; i++) {
                            user.business_emails.push({ email: arr[i] });
                        }
                    }
                    if (req.body.business_description)
                        user.business_description = req.body.business_description;
                    if (req.body.associated_bank)
                        user.associated_bank = req.body.associated_bank;
                    if (req.body.business_website)
                        user.business_website = req.body.business_website;
                    if (req.file) {
                        fs.unlink('./public/businessowner/' + user.business_logo);
                        user.business_logo = req.file.filename;
                    }
                    user.save(function (err, result) {
                        if (err) {
                            console.log(err);
                            return res.status(400).send('An error occured.');
                        }
                    });
                });
            });
        } else
            if (req.body.business_name) {
                BusinessOwner.findOne({ 'business_name': req.body.business_name }, function (err, owner) {
                    if (err) {
                        return res.status(400).send('An error occured.');
                    }
                    if (owner) {
                        return res.status(400).send('New business name already in use.');
                    }
                    user.business_name = req.body.business_name;
                    if (req.body.new_password)
                        user.new_password = user.encryptPassword(req.body.new_password);
                    if (req.body.fullName)
                        user.fullName = req.body.fullName;
                    if (req.body.address)
                        user.address = req.body.address;
                    if (req.body.business_emails) {
                        user.business_emails = [];
                        var a = req.body.business_emails;
                        var arr = a.split(',');
                        for (i = 0; i < arr.length; i++) {
                            user.business_emails.push({ email: arr[i] });
                        }
                    }
                    if (req.body.business_description)
                        user.business_description = req.body.business_description;
                    if (req.body.associated_bank)
                        user.associated_bank = req.body.associated_bank;
                    if (req.body.business_website)
                        user.business_website = req.body.business_website;
                    if (req.file) {
                        fs.unlink('./public/businessowner/' + user.business_logo);
                        user.business_logo = req.file.filename;
                    }
                    user.save(function (err, result) {
                        if (err) return res.status(400).send('An error occured.');
                    });
                });
            } else if (req.body.new_email) {
                BusinessOwner.findOne({ 'personal_email': req.body.new_email }, function (err, owner) {
                    if (err) {
                        return res.json({ result: 'failed', message: 'error' });
                    }
                    if (owner) {
                        return res.json({ result: 'failed', message: 'new email already in use' });
                    } a
                    user.personal_email = req.body.new_email;
                    if (req.body.new_password)
                        user.new_password = user.encryptPassword(req.body.new_password);
                    if (req.body.fullName)
                        user.fullName = req.body.fullName;
                    if (req.body.address)
                        user.address = req.body.address;
                    if (req.body.business_emails) {
                        user.business_emails = [];
                        var a = req.body.business_emails;
                        var arr = a.split(',');
                        for (i = 0; i < arr.length; i++) {
                            user.business_emails.push({ email: arr[i] });
                        }
                    }
                    if (req.body.business_description)
                        user.business_description = req.body.business_description;
                    if (req.body.associated_bank)
                        user.associated_bank = req.body.associated_bank;
                    if (req.body.business_website)
                        user.business_website = req.body.business_website;
                    if (req.file) {
                        fs.unlink('./public/businessowner/' + user.business_logo);
                        user.business_logo = req.file.filename;
                    }
                    user.save(function (err, result) {
                        if (err) res.status(400).send('An error occured.');
                    });
                });
            }
            else {
                if (req.body.new_password)
                    user.new_password = user.encryptPassword(req.body.new_password);
                if (req.body.fullName)
                    user.fullName = req.body.fullName;
                if (req.body.address)
                    user.address = req.body.address;
                if (req.body.business_emails) {
                    user.business_emails = [];
                    var a = req.body.business_emails;
                    var arr = a.split(',');
                    for (i = 0; i < arr.length; i++) {
                        user.business_emails.push({ email: arr[i] });
                    }
                }
                if (req.body.business_description)
                    user.business_description = req.body.business_description;
                if (req.body.associated_bank)
                    user.associated_bank = req.body.associated_bank;
                if (req.body.business_website)
                    user.business_website = req.body.business_website;
                if (req.file) {
                    fs.unlink('./public/businessowner/' + user.business_logo);
                    user.business_logo = req.file.filename;
                }
                user.save(function (err, result) {
                    if (err) return res.status(400).send('An error occured.');
                });
            }
    });
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

router.post('/like', function (req, res) {
    console.log('in like')
    likeBusinessController.likeBusiness(req, res);

})

router.post('/unlike', likeBusinessController.unlikeBusiness);

router.post('/viewliked', function (req, res) {
    likeBusinessController.viewLikedBusinesses(req, res);
    console.log(res);
});


router.get('/somepage', function (req, res) {
    res.render('somepage');
});

router.get('/detailedService/:business/:service', function (req, res) {
    businesses.findOne({ business_name: req.param('business') }, function (err, busi) {
        if (busi)
            for (var i = 0; i < busi.services.length; i++) {
                if (busi.services[i].service_name == req.param('service')) {
                    return res.json({ 'result': 'success', 'message': 'service found', 'content': busi.services[i] })
                }
            }
        return res.json({ 'result': 'failure', 'message': 'service not found' })

    })
});
var stripe = require("stripe")("sk_test_v2rYv9d1Ka4fzqRBKLptDEr8");

router.post('/checkout', function (req, res) {
    // Token is created using Stripe.js or Checkout!
    // Get the payment token submitted by the form:
    var token = req.body.id; // Using Express
    // Charge the user's card:
    var charge = stripe.charges.create({
        amount: Number(req.body.price),
        currency: "usd",
        description: "Example charge",
        source: req.body.token.id,
    }, function (err, charge) {
        // asynchronously called
    });
    res.redirect("/");
})

router.get('/nav', function (req, res) {
    if (!req.user) {
        return res.json({ 'result': 'failure', 'message': 'user not logged in' });
    } else {
        businesses.findOne({ personal_email: req.user.personal_email }, function (err, busi) {
            if (busi) {
                return res.json({ 'result': 'success', 'message': 'business', 'content': busi });
            } else
                Client.findOne({ username: req.user.username }, function (err, client) {
                    if (client) {
                        return res.json({ 'result': 'success', 'message': 'client', 'content': client });
                    } else
                        Admin.findOne({ username: req.user.username }, function (err, admin) {
                            if (admin) {
                                return res.json({ 'result': 'success', 'message': 'admin', 'content': admin });
                            } else
                                return res.json({ 'result': 'failure', 'message': 'username not found' });

                        });
                });
        });
    }
});

//Export router
module.exports = router;
