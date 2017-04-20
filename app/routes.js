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
router.post('/rating/:business', function (req, res) { RateAndReviewCtrl.Post_Rate_Business(req, res); });
router.post('/rating/:business/:service', function (req, res) { RateAndReviewCtrl.Post_Rate_Service(req, res); });
router.post('/reviews/:business', function (req, res) { RateAndReviewCtrl.Post_Review_Business(req, res); });
router.post('/reviews/:business/:service', function (req, res) { RateAndReviewCtrl.Post_Review_Service(req, res); });
router.get('/viewRateBusiness/:business', function (req, res) { RateAndReviewCtrl.Get_Rate_Business(req, res); });
router.get('/viewRateService/:business/:service', function (req, res) { RateAndReviewCtrl.Get_Rate_Service(req, res); });
router.get('/viewReviewBusiness/:business', function (req, res) { RateAndReviewCtrl.Get_Review_Business(req, res); });
router.get('/viewReviewService/:business/:service', function (req, res) { RateAndReviewCtrl.Get_Review_Service(req, res); });
router.post('/reportBusiness/:business', function (req, res) { RateAndReviewCtrl.Report_Business_Review(req, res); });

//Add routes
router.get('/', homepageController.test);
router.get('/viewbusiness', viewController.viewBusiness);
router.get('/viewservices', viewController.viewServices);
router.get('/viewprofile', profileController.viewProfile);
router.get('/editprofile', profileController.getEditProfile);
router.post('/editprofile', upload_client.single('profile_pic'), profileController.editProfile);

router.put('/admin/ban-user/:useremail', adminFunctionsController.banuser);
router.put('/admin/ban-bus/:business_name', adminFunctionsController.banbus);
router.get('/admin/viewReports', adminFunctionsController.viewReportedReviews);
router.put('/admin/deleteReview/:id', adminFunctionsController.deleteReportedReviews);
router.put('/admin/deletebussines/:business_name', adminFunctionsController.deleteOwner);

//Add routes
router.get('/detailedProduct/:businessname/:product', productController.reportServiceReview);
router.get('/viewAdvertisement', productController.viewAdvertisements);
router.get('/viewbusiness', viewController.viewBusiness);
router.post('/advertise/:businessname/:product', productController.addAdvertisment);
router.post('/detailedProduct/:businessname/:product', productController.reportServiceReview);
router.post('/reply', replyController.Post_Reply);
router.post('/deletebussines', Deletebussinesowner.deleteOwner);
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});
router.post('/service_add', serviceController.addservice);
router.post('/service_edit', serviceController.editservice);

//Passport
passport.use(new LocalStrategy(
    function (username, password, done) {
        var already_sent_a_json = 0;
        UserLoginController.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                // console.log("Reached here!");
                adminLoginController.getAdminByUsername(username, function (err, admin) {
                    //console.log("Reached here 1!");
                    if (err) throw err;
                    if (!admin) {
                        //console.log("Reached here 2");
                        return done(null, false);
                    }
                    console.log(admin);
                    adminLoginController.comparePassword(password, admin.password, function (err, isMatch) {
                        //console.log("Reached here 3");
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, admin);
                        } else {
                            return done(null, false);
                        }
                    });
                });
                //return done(null, false);
            } else {

                UserLoginController.comparePassword(password, user.password, function (err, isMatch) {
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



passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserLoginController.getUserById(id, function (err, user) {
        if (!user) {
            adminLoginController.getAdminById(id, function (err, admin) {
                return done(err, admin);
            });
        } else {
            return done(err, user);
        }

    });
});
//  business_owner _service_add page GET
router.get('/service_add', function (req, res) {
    res.render('service_add');
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


// Login businessOwner  POST
router.post('/businessowner_login', function (req, res) {

    var personal_email = req.body.personal_email;
    var password = req.body.password;
    if (personal_email == "" || personal_email == null) {
        res.send("you must enter  your personal email to login ");
        //    res.render('businessowner_login');//login view page in front end
    } else {
        if (password == "" || password == null) {
            res.send("you must enter  your password for your  email to login ");
            //  res.render('businessowner_login');//login view page in front end
        } else {
            businesses.findOne({ personal_email: personal_email }, function (err, userlogin) {
                if (err) {

                    res.status(500).send(err);
                } else {

                    if (userlogin == null) {
                        // if no email mathes error appears
                        res.send("error happened while login no  personal email matches businessOwner please check your email again");


                    } else {
                        // chechking the password to match the password in database for this email
                        if (userlogin.password == password) {
                            res.send("password matches   personal email password ");
                            //   res.redirect('/businessowner_logged');// logged  page view in the front end
                            //  session.username = req.body.personal_email;
                        } else {
                            res.send("password does not matches    personal email password please try again ");
                            //  res.render('businessowner_login'); // login in view page in front end
                        }


                    }

                }
            });
        }
    }
});

// business_owner _service_edit POST
router.post('/service_edit', function (req, res) {
    // data we want to edit in the service  business_owner must add personal email so we can get his data from database
    var personal_email = req.body.personal_email;
    var newservice_pic = req.body.newservice_pic;
    var oldservice_name = req.body.oldservice_name; // business_owner must enter oldservice_name so i can know where to edit
    var newservice_name = req.body.newservice_name;
    var newservice_Description = req.body.newservice_Description;
    var newservice_price = req.body.newservice_price;
    var newpromotion_offer = req.body.newpromotion_offer;
    var newtype_flag = req.body.newtype_flag;
    var newavailable_flag = req.body.newavailable_flag;

    // Validation
    if (personal_email == "" || personal_email == null) {
        res.send("you must enter  your personal email to edit ");
        res.render('service_edit'); // front end service edit
    } else {
        if (oldservice_name == "" || oldservice_name == null) {
            res.send("you must enter  your old service_name  to edit  it ");
            res.render('service_edit'); // front end service edit
        } else {
            // finding the business_owner from database
            businesses.findOne({ personal_email: personal_email }, function (err, user) {
                if (err) {
                    // if no matches sending error  because his email not in the database
                    res.send("error happened while editing your service no matched email in the data base please  try again");
                    res.render('service_edit'); // front end service edit
                } else {
                    for (var i = 0; i < user.services.length; i++) {
                        // searching for his specific service from the array of Services and then edit his data
                        if (user.services[i].service_name == oldservice_name) {
                            user.services[i].service_pic = newservice_pic;
                            user.services[i].service_name = newservice_name;
                            user.services[i].service_Description = newservice_Description;
                            user.services[i].service_price = newservice_price;
                            user.services[i].promotion_offer = newpromotion_offer;
                            user.services[i].type_flag = newtype_flag;
                            user.services[i].available_flag = newavailable_flag;
                        }
                    }

                    user.save(function (err, saved_service) { // save database after editing
                        if (err) {
                            // sending error if did not save the database
                            res.send("error happened while editing your service please try again");
                            res.render('service_edit'); // front end service edit
                        } else {
                            // confirmation for editing database
                            res.send(saved_service);
                            res.redirect('/services'); // page of services belong to my business
                            res.send("you edited your service");
                        }

                    });
                }
            });
        }
    }

});

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
router.post('/register', function (req, res) {
    var already_sent_a_json = 0;
    var fullName = req.body.fullName;
    var email = req.body.email;
    var username = req.body.username;
    var address = req.body.address;
    var phone_number = req.body.phone_number;
    var password = req.body.password;
    //  var password2 = req.body.password2;

    // Validation
    req.checkBody('fullName', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('phone_number', 'Phone Number is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    //    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        if (already_sent_a_json == 0) {
            already_sent_a_json = 1
            return res.json({ result: "failure", message: "The email is not valid" });
        }
    } else {
        var newClient = new User({
            fullName: fullName,
            email: email,
            username: username,
            address: address,
            phone_number: phone_number,
            password: password
        });

        var query1 = { username: newClient.username };
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
            } else {
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

        UserRegisterController.createUser(newClient, function (err2, client) {
            if (err2) {
                if (already_sent_a_json == 0) {
                    already_sent_a_json = 1
                    return res.json({ result: "failure", message: "an error occured" });
                }
            } else {
                if (already_sent_a_json == 0) {
                    already_sent_a_json = 1
                    console.log(client);
                    console.log("backend");
                    return res.json({ result: "success", message: "The registration was successful" });
                }
            }
        });
    }
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/routes/successjson', failureRedirect: '/routes/failurejson' }));

router.get('/successjson', function (req, res) {
    res.json({ result: "success", message: "You have successfully logged in" })
});

router.get('/failurejson', function (req, res) {
    res.json({ result: "failure", message: "Unknown User" });
});

router.post('/logout', function (req, res) {
    req.logout();
    return res.json({ result: "success", message: "You have successfully logged out" });
});

router.get('/subscribe', function (req, res, next) {
    res.render('subscribe');
});

router.post('/subscribe', upload.single('business_logo'), function (req, res) {
    BusinessOwner.findOne({ 'personal_email': req.body.personal_email }, function (err, owner) { //check that email is unique
        if (err) {
            return res.json({ 'result': 'failed', 'message': 'error' });
        }
        if (owner) {
            fs.unlink('./public/businessowner/' + req.file.filename); // same as **
            return res.json({ 'result': 'failed', 'message': 'email already in use' });
        }
        BusinessOwner.findOne({ 'business_name': req.body.business_name }, function (err, owner) { // check that business name is unique
            if (err) {
                return res.json({ 'result': 'failed', 'message': 'error' });
            }
            if (owner) {
                fs.unlink('./public/businessowner/' + req.file.filename); //  same as **
                return res.json({ 'result': 'failed', 'message': 'business name in use' });
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
            newOwner.save(function (err, result) {
                if (err) return res.json({ 'result': 'failed', 'message': 'error' });
                return res.json({ 'result': 'success', 'message': 'subscribed to directpry' });
            });
        });
    });
});

router.get('/editboprofile', function (req, res) {
    res.render('editprofile');
});

router.post('/editboprofile', upload.single('business_logo'), function (req, res) {

    BusinessOwner.findOne({ 'personal_email': req.body.personal_email }, function (err, user) {
        if (err) {
            return res.json({ 'result': 'failed', 'message': 'error' });
        }
        if (!user) {
            return res.json({ 'result': 'failed', 'message': 'user not found' });
        }
        if (!user.validPassword(req.body.password)) {
            return res.json({ 'result': 'failed', 'message': 'wrong password' });
        }
        if (req.body.new_email && req.body.business_name) {
            BusinessOwner.findOne({ 'personal_email': req.body.new_email }, function (err, owner) {
                if (err) {
                    return res.json({ 'result': 'failed', 'message': 'error' });
                }
                if (owner) {
                    return res.json({ 'result': 'failed', 'message': 'new email already in use' });
                }
                user.personal_email = req.body.new_email;
                BusinessOwner.findOne({ 'business_name': req.body.business_name }, function (err, owner) {
                    if (err) {
                        return res.json({ 'result': 'failed', 'message': 'error' });
                    }
                    if (owner) {
                        return res.json({ 'result': 'failed', 'message': 'new business name already in use ' });
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
                        if (err) return res.json({ 'result': 'failed', 'message': 'error' });
                        return res.json({ 'result': 'success', 'message': 'business profile updated' });
                    });
                });
            });
        } else
            if (req.body.business_name) {
                BusinessOwner.findOne({ 'business_name': req.body.business_name }, function (err, owner) {
                    if (err) {
                        return res.json({ 'result': 'failed', 'message': 'error' });
                    }
                    if (owner) {
                        return res.json({ 'result': 'failed', 'message': 'new business name already in use ' });
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
                        if (err) return res.json({ 'result': 'failed', 'message': 'error' });
                        return res.json({ 'result': 'success', 'message': 'business profile updated' });
                    });
                });
            } else if (req.body.new_email) {
                BusinessOwner.findOne({ 'personal_email': req.body.new_email }, function (err, owner) {
                    if (err) {
                        return res.json({ 'result': 'failed', 'message': 'error' });
                    }
                    if (owner) {
                        return res.json({ 'result': 'failed', 'message': 'new email already in use' });
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
                        if (err) return res.json({ 'result': 'failed', 'message': 'error' });
                        return res.json({ 'result': 'success', 'message': 'business profile updated' });
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
                    if (err) return res.json({ 'result': 'failed', 'message': 'error' });
                    return res.json({ 'result': 'success', 'message': 'business profile updated' });
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
    likeBusinessController.likeBusiness(req, res);

})

router.post('/unlike', likeBusinessController.unlikeBusiness);

router.post('/viewliked', function (req, res) {
    likeBusinessController.viewLikedBusinesses(req, res);
    console.log(res);
});

router.post('/view_unaccepted_businesses', view_unaccepted_businesses.view_unaccepted);
router.post('/accept_application/:business', view_unaccepted_businesses.accept_application);

router.get('/somepage', function (req, res) {
    res.render('somepage');
});

router.get('/detailedService/:business/:service', function (req, res) {
    businesses.findOne({ business_name: req.param('business') }, function (err, busi) {
        for (var i = 0; i < busi.services.length; i++) {
            if (busi.services[i].service_name == req.param('service')){
            res.json({ 'result': 'success', 'message': 'service found', 'content':busi.services[i]})
            }else{
            res.json({ 'result': 'failure', 'message': 'service not found'})
            }
        }
    })
});

//Export router
module.exports = router;