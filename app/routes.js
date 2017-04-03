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

//  business_owner _service_add page GET
router.get('/service_add', function(req, res) {
    res.render('service_add');
});
//  business_owner _service_edit page GET
router.get('/service_edit', function(req, res) {
    res.render('service_edit');
});
// Login businessOwner page GET
router.get('/login', function(req, res) {
    res.render('login');
});

// business_owner _service_add POST
router.post('/service_add', function(req, res) {
    var username=req.body.username;
    var service_pic = req.body.service_pic;
    var service_name = req.body.service_name;
    var service_Description = req.body.service_Description;
    var service_price = req.body.service_price;
    var type_flag=req.body.type_flag;// need to be adjusted because idk if the boolean is taken like that
  var available_flag=req.body.available_flag;// same as type_flag comment
var promotion_offer=req.body.promotion_offer;
    // Validation

    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('service_name', 'service_name is required').notEmpty();
    req.checkBody('service_Description', 'service_Description is required').notEmpty();
    req.checkBody('service_price', 'service_price is required').notEmpty();



    var errors = req.validationErrors();

    if (errors) {
        res.render('service_add', {
            errors: errors

        });
    } else {
        var newservice = new services({
            service_pic: service_pic,
            service_name: service_name,
            service_Description: service_Description,
            service_price: service_price,
            type_flag: type_flag,
            available_flag: available_flag,
promotion_offer:promotion_offer
            //service_rating ,service_reviews we must set them to null and zeros or leave them ?
        });

services.update(
  {"username":username},
  {"$push":{"services":newservice}},
  function(err, result) {
      if (err) { console.log(err); res.send(err); return;}
      if (result) {
        req.flash('success_msg','You added your service');
        res.redirect('/services');// page of services belong to my business
      } else {
  req.flash('error_msg', 'error happened in adding the service please check your inouts');// error message for not finding the specified username to add into
res.render('service_add'); // return to adding service page
    }
  });




    }
});

// business_owner _service_edit POST
router.post('/service_edit', function(req, res) {
    var username=req.body.username;   // we must add username to search for the specific business_owner also i added  var username in business_owner schema
    var newservice_pic = req.body.newservice_pic;
    var oldservice_name = req.body.oldservice_name;// business_owner must enter oldservice_name so i can know where to edit
    var newservice_name = req.body.newservice_name;
    var newservice_Description = req.body.newservice_Description;
    var newservice_price = req.body.newservice_price;
    var newpromotion_offer=req.body.newpromotion_offer;
    var newtype_flag=req.body.newtype_flag;// need to be adjusted because idk if the boolean is taken like that
    var newavailable_flag=req.body.newavailable_flag;   // need to be adjusted because idk if the boolean is taken like that


    // Validation

    req.checkBody('username', 'username is required').notEmpty();




    var errors = req.validationErrors();

    if (errors) {
        res.render('service_edit', {
            errors: errors

        });
    } else {


services.update(
  {username:username,services:{ $eleMatch:{service_name:oldservice_name}}},{ //searching for the array of services suing username then matching first element with service name = old service_name then updating all data using $set
    $set:{
      "services.$.service_pic":newservice_pic,
      "services.$.service_name":newservice_name,
      "services.$.service_Description":newservice_Description,
      "services.$.service_price":newservice_price,
      "services.$.promotion_offer":newpromotion_offer,
      "services.$.type_flag":newtype_flag,
      "services.$.available_flag":newavailable_flag,
    }
  },
  function(err, result) {
      if (err) { console.log(err); res.send(err); return;}
      if (result) {
        req.flash('success_msg', 'You edited your service');

        res.redirect('/services');// page of services belong to my business
      } else {
  req.flash('error_msg', 'error happened in editing the service please check your inouts');// error message for not finding the specified username to edit into
res.render('service_edit'); // return to adding service page
    }
  });




    }
});

//Export router
module.exports = router;
