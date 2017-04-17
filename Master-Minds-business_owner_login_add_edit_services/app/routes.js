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
var Deletebussinesowner= require('./controllers/Deletebussinesowner');
var serviceController=require('./controllers/serviceController');

let session = require('express-session');
let businesses = require('../models/businessOwners');

var view_unaccepted_businesses = require('./controllers/view_unaccepted_businesses');
var RateAndReviewCtrl = require('./controllers/RateAndReviewCtrl.js');
var path = require('path');
//post(/rating/breakout);
//post(/rating/paintball);
//post(/rating/prison);
router.post('/rating/:business',function(req,res) // add new rating to the business
{
  if(req.user)
    {
    RateAndReviewCtrl.Post_Rate_Business(req,res);
    }
  else
    {console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }

}
);
router.post('/rating/:business/:service',function(req,res) // add new rating to the service
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Post_Rate_Service(req,res);
    }
}
);
router.post('/reviews/:business',function(req,res) // add new review to the business
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Post_Review_Business(req,res);
    }
}
);
router.post('/reviews/:business/:service',function(req,res)// add new review to the service
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Post_Review_Service(req,res);
    }
}
);


router.get('/test',function(req,res)// add new review to the service
{

      RateAndReviewCtrl.Post_test(req,res);

}
);
//new stuff from bulldozer
//////////////////////////////////////////////////////////////////////////////////////////////
 router.get('/viewRateBusiness/:business',function(req,res) // view rating of a service
{
      RateAndReviewCtrl.Get_Rate_Business(req,res);
}
);


 router.get('/viewRateService/:business/:service',function(req,res) // view rating of a service
{
      RateAndReviewCtrl.Get_Rate_Service(req,res);

}
);

router.get('/viewReviewBusiness/:business',function(req,res) // view review of a business
{
      RateAndReviewCtrl.Get_Review_Business(req,res);
}
);

router.get('/viewReviewService/:business/:service',function(req,res) // view review of a service
{
      RateAndReviewCtrl.Get_Review_Service(req,res);
}
);

/*
router.get('/viewReviewNumberedBusiness/:business',function(req,res) // view reviews numbered of a business
{
      RateAndReviewCtrl.Get_Review_Numbered_Business(req,res);
}
);

router.get('/viewReviewNumberedService/:business/:service',function(req,res) // view reviews numbered of a service
{
      RateAndReviewCtrl.Get_Review_Numbered_Service(req,res);

}
);*/

router.post('/reportBusiness/:business',function(req,res) // report a business' review
{
  if(!req.user)
    {
    console.log(401);
    res.status(401).send("plz log in plz");
    //res.render(loggin_page);
    }
  else
    {
      RateAndReviewCtrl.Report_Business_Review(req,res);
    }
}
);

//Add routes
router.get('/', homepageController.test);
router.get('/viewbusiness', viewController.viewBusiness);
router.get('/viewservices', viewController.viewServices);
router.get('/viewprofile', profileController.viewProfile);
router.get('/editprofile', profileController.getEditProfile);
router.post('/editprofile',upload_client.single('profile_pic'), profileController.editProfile);
router.put('/admin/ban-user/:useremail', adminFunctionsController.banuser);
router.put('/admin/ban-bus/:business_name', adminFunctionsController.banbus);
router.get('/admin/viewReports', adminFunctionsController.viewReportedReviews);

//Add routes
router.get('/detailedProduct/:businessname/:product', productController.reportServiceReview);
router.get('/viewAdvertisement', productController.viewAdvertisements);
router.get('/viewbusiness', viewController.viewBusiness);
router.post('/advertise/:businessname/:product', productController.addAdvertisment);
router.post('/detailedProduct/:businessname/:product', productController.reportServiceReview);
router.post('/reply', replyController.Post_Reply);
router.post('/deletebussines', Deletebussinesowner.deleteowner);
router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
   });
   router.post('/service_add',serviceController.addservice);
    router.post('/service_edit',serviceController.editservice);

//Passport
passport.use(new LocalStrategy(
    function(username, password, done) {
        UserLoginController.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
              console.log("Reached here!");
              adminLoginController.getAdminByUsername(username,function(err, admin){
                  console.log("Reached here 1!");
                  if (err) throw err;
                  if (!admin){
                    console.log("Reached here 2");
                    return done(null, false);
                  }
                  console.log(admin);
                  adminLoginController.comparePassword(password, admin.password, function(err, isMatch) {
                    console.log("Reached here 3");
                    if (err) throw err;

                    if (isMatch) {
                      return done(null, admin);
                    } else {
                      return done(null, false);
                    }
                  });
              });
                //return done(null, false);
            }else{

            UserLoginController.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }});
    }));



    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        UserLoginController.getUserById(id, function(err, user) {
            done(err, user);
        });
    });
    //  business_owner _service_add page GET
    router.get('/service_add', function(req, res) {
        res.render('service_add');
    });


    //  business_owner _service_edit  pageG ET
    router.get('/service_edit', function(req, res) {
        res.render('service_edit');
    });
    // Login businessOwner page page GET
    router.get('/businessOwner_login', function(req, res) {
        res.render('login');
    });

    // Login businessOwner  POST
    router.post('/businessowner_login',function(req,res){

          var personal_email=req.body.personal_email;
          var password=req.body.password;
          if(personal_email==""||personal_email==null){
            res.send("you must enter  your personal email to login ");
                //    res.render('businessowner_login');//login view page in front end
          }else{
            if(password==""||password==null){
              res.send("you must enter  your password for your  email to login ");
            //  res.render('businessowner_login');//login view page in front end
            }else{
              businesses.findOne({personal_email:personal_email},function(err,userlogin){
                if(err){

                  res.status(500).send(err);
                }else{
                
                  if(userlogin == null){
                    // if no email mathes error appears
                    res.send("error happened while login no  personal email matches businessOwner please check your email again");
                  // res.render('businessowner_login'); // login view page in front end
                  //  res.send(err);

                }else{
                  // chechking the password to match the password in database for this email
                if(userlogin.password==password){
                  res.send("password matches   personal email password ");
                //   res.redirect('/businessowner_logged');// logged  page view in the front end
                  session.username = req.body.personal_email;
                }else{
                  res.send("password does not matches    personal email password please try again ");
                  //  res.render('businessowner_login'); // login in view page in front end
                }

            }
          }
          });
        }
    }
    });




// Register
router.get('/register', function (req, res) {

    res.render('register');
});

router.get('/successRedirect', function(req, res) {
    res.send("successRedirect");
});
router.get('/failureRedirect', function(req, res) {
    res.send("failureRedirect");


});
// Login
router.get('/login', function (req, res) {
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

        res.redirect('/login');
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        UserLoginController.getUserByUsername(username, function(err, user) {
            if (err) {
              console.log(err.message);
              res.status(500).send(error.message);
            }
            if (!user) {
                return done(null, false);
            }

            UserLoginController.comparePassword(password, user.password, function(err, isMatch) {
                if (err)
                {
                  console.log(err.message);

                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    }));



router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
    function (req, res) {
        console.log("i am logged in");
        res.redirect('/');
        session.username = req.body.username;
    });

router.get('/logout', function (req, res) {
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


            newOwner.save(function (err, result) {
                if (err) return console.error(err);
                res.redirect('/service_add')
            });
        });
    });
});


router.get('/editboprofile', isLoggedIn, function(req, res, next){
    var messages = req.flash('error');   // supply error messages to view
    res.render('editprofile', {messages: messages, hasErrors: messages.length>0});
});

router.post('/editboprofile', upload.single('business_logo'), function(req, res){
    BusinessOwner.findOne({'personal_email' : req.user.personal_email}, function(err, user){ // access the logged in user's information
        var waitForCallback = 0;
        if(req.body.business_name){
            waitForCallback = 1;
            BusinessOwner.findOne({'business_name' : req.body.business_name}, function(err, owner){ // check if new business name is taken
                if(err){
                    return console.error(err);
                }
                if(owner){
                    req.flash('error', 'There is already a business with that name.');
                    return res.redirect('/editboprofile');
                }
                req.user.business_name = req.body.business_name;
                waitForCallback = 0;
            });
        }
        while(waitForCallback);
        if(req.body.personal_email){
            waitForCallback = 1;
            BusinessOwner.findOne({'personal_email' : req.body.personal_email}, function(err, owner){ // check if new email is used already
                if(err){
                    return console.error(err);
                }
                if(owner){
                    req.flash('error', 'That email address is already in use.');
                    return res.redirect('/editboprofile');
                }
                user.personal_email = req.body.personal_email;
                waitForCallback = 0;
            });
        }
        while(waitForCallback);
        if(req.body.password)  // keep assigning new values (if any)
            user.password = user.encryptPassword(req.body.password);
        if(req.body.address)
            user.address = req.body.address;
        if(req.body.fullname)
            user.fullname = req.body.fullname;
        if(req.body.business_emails){
            user.business_emails = [];
            var a = req.body.business_emails;
            var arr = a.split(',');
            for (i = 0; i < arr.length; i++) {
                user.business_emails.push({ email: arr[i] });
            }
        }
        if(req.body.business_description)
            user.business_description = req.body.business_description;
        if(req.body.associated_bank)
            user.associated_bank = req.body.associated_bank;
        if(req.body.business_website)
            user.business_website = req.body.business_website;
        if(req.body.address)
            user.address = req.body.address;
        if(req.file){
            user.business_logo = req.file.filename;
        }
        user.save(function(err){
            if(err) return console.error(error);
            res.send('Profile Updated');
        });
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

//Export router
module.exports = router;
