//Require dependencies 
var fs = require('fs');
var express = require('express');
var router = express.Router();
var validator = require('express-validator');
var homepageController = require('./controllers/hompageController');
var BusinessOwner = require('../models/businessOwners');
var Admin = require('../models/admins');
var Client = require('../models/clients');
var multer = require('multer');
var upload = multer({ dest: './public/businessowner' });
var viewController = require('./controllers/viewController');
var profileController = require('./controllers/profileController');
var productController = require('./controllers/productController');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/clients');
var UserRegisterController = require('./controllers/ClientRegisterController');
var UserLoginController = require('./controllers/ClientLoginController');

//Add routes
router.get('/', homepageController.test); //Testing image
router.get('/detailedProduct/:businessname/:product', productController.reportServiceReview);
router.get('/viewAdvertisement', productController.viewAdvertisements);
router.get('/viewbusiness', viewController.viewBusiness);
router.get('/viewservices', viewController.viewServices);
router.get('/viewprofile', profileController.viewProfile);
router.post('/editprofile', profileController.editProfile);
router.post('/detailedProduct/:businessname/:product', productController.addAdvertisment);
router.post('/detailedProduct/:businessname/:product', productController.reportServiceReview);

// Register
router.get('/register', function(req, res) {
    res.render('register');
});

// Login
router.get('/login', function(req, res) {
    res.render('login');
});

// Register User
router.post('/register', function(req, res) {
    var fullName = req.body.fullName;
    var email = req.body.email;
    var username = req.body.username;
    var address = req.body.address;
    var phone_number = req.body.phone_number;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('fullName', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('phone_number', 'Phone Number is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newClient = new User({
            fullName: fullName,
            email: email,
            username: username,
            address: address,
            phone_number: phone_number,
            password: password
        });

        UserRegisterController.createUser(newClient, function(err, client) {
            if (err) throw err;
            console.log(client);
        });

        //req.flash('success_msg', 'You are registered and can now login');

        //res.redirect('/login');
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        UserLoginController.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false);
            }

            UserLoginController.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserLoginController.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        console.log("i am logged in");
        res.redirect('/');
    });

router.get('/logout', function(req, res) {
    req.logout();

    // req.flash('success_msg', 'You are logged out');

    res.redirect('/login');
});

router.get('/subscribe', function(req, res, next) {
    var messages = req.flash('error'); // supply view with the error messages that appeared (if any)
    res.render('subscribe', { messages: messages, hasErrors: messages.length > 0 });
});

router.post('/subscribe', upload.single('business_logo'), function(req, res) {
    // check for any mistakes or lack of input in the input form
    req.checkBody('personal_email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
    req.checkBody('business_name', 'Please enter business name').notEmpty();
    req.checkBody('fullname', "Please enter business owner's name").notEmpty();
    req.checkBody('business_description', 'PLease enter business description').notEmpty();
    req.checkBody('business_emails', 'Please enter business emails').notEmpty();
    req.checkBody('associated_bank', 'Please enter associated bank info').notEmpty();
    var errors = req.validationErrors();
    var messages = [];
    var flag = 1;
    if (!req.file) {
        flag = 0; // flag set to 0 if no file has been uploaded
        messages.push('Need to upload a business logo'); //  check whether business logo has been uploaded or not
    }
    if (errors) {
        errors.forEach(function(error) {
            messages.push(error.msg); // prepare the error messages that will be shown
        });
        if (flag) // ** if there are errors, and hence nothing will be inserted into the db, remove the file that upload.single uploaded
            fs.unlink('./public/businessowner/' + req.file.filename);
        req.flash('error', messages); // flash error messages
        return res.redirect('/subscribe');
    }
    BusinessOwner.findOne({ 'personal_email': req.body.personal_email }, function(err, owner) { //check that email is unique
        if (err) {
            return console.error(err);
        }
        if (owner) {
            fs.unlink('./public/businessowner/' + req.file.filename); // same as **
            req.flash('error', 'Email is already in use.'); // flash error message
            return res.redirect('/subscribe');
        }
        BusinessOwner.findOne({ 'business_name': req.body.business_name }, function(err, owner) { // check that business name is unique
            if (err) {
                return console.error(err);
            }
            if (owner) {
                fs.unlink('./public/businessowner/' + req.file.filename); //  same as **
                req.flash('error', 'There is already a business with that name.'); // flash error message
                return res.redirect('/subscribe');
            }
            var newOwner = new BusinessOwner(); // insert data into database
            newOwner.personal_email = req.body.personal_email;
            newOwner.password = newOwner.encryptPassword(req.body.password);
            newOwner.business_name = req.body.business_name;
            newOwner.fullname = req.body.fullname;
            newOwner.business_description = req.body.business_description;
            newOwner.business_logo = req.file.filename;
            var a = req.body.business_emails;
            var arr = a.split(',');
            for (i = 0; i < arr.length; i++) {
                newOwner.business_emails.push({ email: arr[i] });
            }
            newOwner.associated_bank = req.body.associated_bank;
            newOwner.business_website = req.body.business_website;
            newOwner.business_reviews_and_reports = [];
            newOwner.rating = [];
            newOwner.accepted = false; // shows that this business is pending approval by the admin to be shown on the directory

            newOwner.save(function(err, result) {
                if (err) return console.error(err);
                //res.redirect('addservices')
            });
        });
    });
});


//Export router
module.exports = router;