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

let session = require('express-session');
let businesses = require('../models/businessOwners');



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

//Passport
passport.use(new LocalStrategy(
    function(username, password, done) {
        UserLoginController.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
              console.log("Reached here!");
              adminLoginController.getAdminByUsername(username,function(err, admin){
                  console.log("Reached here!");
                  if (err) throw err;
                  if (!admin){
                    console.log("Reached here 1");
                    return done(null, false);
                  }
                  adminLoginController.comparePassword(password, admin.password, function(err, isMatch) {
                    console.log("Reached here 2");
                    if (err) throw err;

                    if (isMatch) {
                      return done(null, admin);
                    } else {
                      return done(null, false);
                    }
                  });
              });
                //return done(null, false);
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
        if(!user || err){
          adminLoginController.getAdminById(id, function(err, user) {done(err, user);});
        }
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
                res.render('businessowner_login');//login view page in front end
      }else{
        if(password==""||password==null){
          res.send("you must enter  your password for your  email to login ");
          res.render('businessowner_login');//login view page in front end
        }else{
          businesses.findOne({personal_email:personal_email},function(err,userlogin){
            if(err){
              // if no email mathes error appears
              res.send("error happened while login no  personal email matches businessOwner please check your email again");
             res.render('businessowner_login'); // login view page in front end
              res.send(err);

            }else{
              // chechking the password to match the password in database for this email
            if(userlogin.password==password){
              res.send("password matches   personal email password ");
              res.redirect('/businessowner_logged');// logged  page view in the front end
            }else{
              res.send("password does not matches    personal email password please try again ");
                res.render('businessowner_login'); // login in view page in front end
            }

        }
      });
    }
}
});

// business_owner _service_add POST
router.post('/service_add', function(req, res) {
  //getting data from user to add it in his services array
   var business = new businesses();
    var personal_email=req.body.personal_email;
    var service_pic = req.body.service_pic;
    var service_name = req.body.service_name;
    var service_Description = req.body.service_Description;
    var service_price = req.body.service_price;
    var type_flag=req.body.type_flag;
    var available_flag=req.body.available_flag;
    var promotion_offer=req.body.promotion_offer;

    // Validation
if(personal_email==""||personal_email==null){
  res.send("you must enter  your personal email to add service");
  res.render('service_add'); // front end view for service_add
}else{
  if(service_name==""||service_name==null){
    res.send("you must enter  your  service_name to add service");
    res.render('service_add');// front end view for service_add
  }else{
    if(service_Description==""||service_Description==null){
      res.send("you must enter  your  service_Description to add service ");
      res.render('service_add');// front end view for service_add
    }else{
      if(service_price==""||service_price==null){
        res.send("you must enter  your service_price to add service ");
        res.render('service_add');// front end view for service_add
      }else{
        // getting the business owner from the database to add in it the service
        businesses.findOne({personal_email:personal_email},function(err,Found_data){
          if(err){
            // if no email mathes error appears
            res.send("error happened while adding your service no personal email matches businessOwner please check your email again");
            res.render('service_add');// front end view for service_add
            res.send(err);

          }else{
            // pushing the data of serivces the business_owner want's to add
          Found_data.services.push({service_pic:service_pic,
            service_name:service_name,
          service_Description:service_Description,
          service_price:service_price,
          promotion_offer:promotion_offer,
          type_flag:type_flag,
          available_flag:available_flag
          });

          Found_data.save(function(err, saved){//saving the database after pushing
            if (err){
                     // error sent to user if error happened while saving database
              res.send("error happened while adding your service please try again");
              res.render('service_add');// front end view for service_add
              res.send(err);
            }else{

              res.redirect('/services');// page of services belong to my servies
             res.send("you added your service");
                    // confirmation for adding database
            }
          })

        }
        });

      }
    }
  }
}
});


// business_owner _service_edit POST
router.post('/service_edit', function(req, res) {
  // data we want to edit in the service  business_owner must add personal email so we can get his data from database
    var personal_email=req.body.personal_email;
    var newservice_pic = req.body.newservice_pic;
    var oldservice_name = req.body.oldservice_name;// business_owner must enter oldservice_name so i can know where to edit
    var newservice_name = req.body.newservice_name;
    var newservice_Description = req.body.newservice_Description;
    var newservice_price = req.body.newservice_price;
    var newpromotion_offer=req.body.newpromotion_offer;
    var newtype_flag=req.body.newtype_flag;
    var newavailable_flag=req.body.newavailable_flag;

    // Validation
    if(personal_email==""||personal_email==null){
      res.send("you must enter  your personal email to edit ");
      res.render('service_edit');// front end service edit
    }else{
    if(oldservice_name==""||oldservice_name==null){
      res.send("you must enter  your old service_name  to edit  it ");
      res.render('service_edit');// front end service edit
    }else{
      // finding the business_owner from database
      businesses.findOne({personal_email: personal_email}, function(err, user){
                  if(err){
                    // if no matches sending error  because his email not in the database
                      res.send("error happened while editing your service no matched email in the data base please  try again");
                      res.render('service_edit');// front end service edit
                  }else{
   for(var i=0;i< user.services.length;i++){
     // searching for his specific service from the array of Services and then edit his data
     if(user.services[i].service_name==oldservice_name){
      user.services[i].service_pic=newservice_pic;
    user.services[i].service_name=newservice_name;
      user.services[i].service_Description=newservice_Description;
      user.services[i].service_price=newservice_price;
      user.services[i].promotion_offer=newpromotion_offer;
      user.services[i].type_flag=newtype_flag;
      user.services[i].available_flag=newavailable_flag;
     }
   }

     user.save(function(err,saved_service){// save database after editing
     if(err){
       // sending error if did not save the database
       res.send("error happened while editing your service please try again");
       res.render('service_edit');// front end service edit
     }else{
       // confirmation for editing database
       res.send(saved_service);
       res.redirect('/services');// page of services belong to my business
       res.send("you edited your service");
     }

     });
  }
                  });
    }
  }

});



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

        res.redirect('/login');
    }
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        console.log("i am logged in");
        res.redirect('/');
        session.username = req.body.username;
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




router.post('/like',function(req,res){
  likeBusinessController.likeBusiness(req,res);
})

router.post('/unlike',likeBusinessController.unlikeBusiness);

router.post('/viewliked',function(req,res){
  likeBusinessController.viewLikedBusinesses(req,res);
  console.log(res);
});

//Export router
module.exports = router;
