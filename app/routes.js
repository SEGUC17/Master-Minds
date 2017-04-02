//Require dependencies
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');
var authenticationController = require('./authenticate');
var businessOwners = require('../models/businessOwners');

//Add routes
router.get('/', homepageController.test);
router.post('/auth', authenticationController);
router.get('/auth', authenticationController);



/* businessOwners login */

//  business_owner _service_add page
router.get('/service_add', function(req, res) {
    res.render('service_add');
});
// Login businessOwner page
router.get('/login', function(req, res) {
    res.render('login');
});

// business_owner _service
router.post('/service_add', function(req, res) {
    var username=req.body.username;

    var service_pic = req.body.service_pic;
    var service_name = req.body.service_name;
    var service_Description = req.body.service_Description;
    var service_price = req.body.service_price;
    var type_flag=req.body.type_flag;// need to be adjusted because idk if the boolean is taken like that
  var available_flag=req.body.available_flag;// same as type_flag comment
    // Validation
    req.checkBody('service_category', 'service_category is required').notEmpty();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('service_name', 'service_name is required').notEmpty();
    req.checkBody('service_Description', 'service_Description is required').notEmpty();
    req.checkBody('service_price', 'service_price is required').notEmpty();



    var errors = req.validationErrors();

    if (errors) {
        res.render('service_add', {
            errors: errors
            //  req.flash('error', 'there is error in adding service please try again');
        });
    } else {
        var newservice = new businessOwners_services({
            service_pic: service_pic,
            service_name: service_name,
            service_Description: service_Description,
            service_price: service_price,
            type_flag: type_flag,
            available_flag: available_flag

            //promotion_offer ,service_rating ,service_reviews we must set them to null and zeros or leave them ?
        });

services.update(
  {"username":username},
  {"$push":{"services":newservice}},
  function(err, result) {
      if (err) { console.log(err); res.send(err); return;}
      if (result) {
        req.flash('success_msg', 'You added your service');

        res.redirect('/services');// page of services belong to my business
      } else {
  req.flash('error_msg', 'error happened in adding the service please check your inouts');// error message for not finding the specified username to add into
res.render('service_add'); // return to adding service page
    }
  });




    }
});


//Export router
module.exports = router;
