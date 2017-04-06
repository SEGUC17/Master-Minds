var fs = require('fs');
var express = require('express');
var router = express.Router();
var RateAndReviewCtrl = require('./controllers/RateAndReviewCtrl.js');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/clients');
var UserRegisterController = require('./controllers/ClientRegisterController');
var UserLoginController = require('./controllers/ClientLoginController');

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


router.get('/viewReviewNumberedBusiness/:business',function(req,res) // view reviews numbered of a business
{
      RateAndReviewCtrl.Get_Review_Numbered_Business(req,res);
}
);

router.get('/viewReviewNumberedService/:business/:service',function(req,res) // view reviews numbered of a service
{
      RateAndReviewCtrl.Get_Review_Numbered_Service(req,res);

}
);

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


// Register
router.get('/register', function(req, res) {
    res.send('register');
});

router.get('/successRedirect', function(req, res) {
    res.send("successRedirect");
});
router.get('/failureRedirect', function(req, res) {
    res.send("failureRedirect");
});

// Register User
router.post('/register', function(req, res) {
    var fullname = req.body.fullname;
    var email = req.body.email;
    var username = req.body.username;
    var address = req.body.address;
    var phone_number = req.body.phone_number;
    var password = req.body.password;
    var password2 = req.body.password2;
    console.log(fullname);
    // Validation
    req.checkBody('fullname', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('phone_number', 'Phone Number is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
      /*  res.render('register', {
            errors: errors
        });*/
        console.log(401);
        console.log(errors);
        res.status(500).send(errors);
    } else {
        var newClient = new User({
            fullName: fullname,
            email: email,
            username: username,
            address: address,
            phone_number: phone_number,
            password: password
        });

        UserRegisterController.createUser(newClient, function(err, client) {
            if (err)
            {console.log(err);
              console.log(401);
            res.status(500).send(errors);}
            else
            {
              console.log("200")
            console.log(client);
            res.status(200).send("added");
            }
        });

        //req.flash('success_msg', 'You are registered and can now login');

        //res.redirect('/login');
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

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserLoginController.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/successRedirect', failureRedirect: 'failureRedirect', failureFlash: true }),
    function(req, res) {
        console.log("logged");
        res.status(200).send("logged");
    });

router.get('/logout', function(req, res) {
    req.logout();

    //req.flash('success_msg', 'You are logged out');

    //res.redirect('/login');
});

module.exports = router;
