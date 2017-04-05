//Require dependencies
var fs = require('fs');
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');
var authenticationController = require('./authenticate');

let businesses = require('../models/businessOwners');


//Add routes
//router.get('/', homepageController.test);
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
    // req.checkBody('personal_email', 'personal_email is required').notEmpty();
    //   req.checkBody('service_name', 'service_name is required').notEmpty();
    // req.checkBody('service_Description', 'service_Description is required').notEmpty();
    // req.checkBody('service_price', 'service_price is required').notEmpty();



  //  var errors = req.validationErrors();
  //
  //   if (errors) {
  //       res.render('service_add', {
  //           errors: errors
  //
  //       });
  //   } else {
  //  put validation code here
//         });

businesses.findOne({personal_email:personal_email},function(err,Found_data){
  if(err){
    res.send(err);
  }else{
  Found_data.services.push({service_pic:service_pic,
    service_name:service_name,
  service_Description:service_Description,
  service_price:service_price,
  promotion_offer:promotion_offer,
  type_flag:type_flag,
  available_flag:available_flag
  });
 console.log(Found_data);
  Found_data.save(function(err, saved){
    if (err){
      console.log('err');
      res.send(err);
    }else{
      console.log(saved);
      res.send(Found_data);
    }
  })

}
});



//       if (result) {
//       //  req.flash('success_msg','You added your service');
//        //res.redirect('/services');// page of services belong to my business
//        res.send("succ");
//       } else {
//   //req.flash('error_msg', 'error happened in adding the service please check your inouts');// error message for not finding the specified username to add into
// res.render('service_add'); // return to adding service page

});

// business_owner _service_edit POST
router.post('/service_edit', function(req, res) {
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

    //req.checkBody('personal_email', 'personal_email is required').notEmpty();

    // var errors = req.validationErrors();
    //
    // if (errors) {
    //     res.render('service_edit', {
    //         errors: errors
    //
    //     });
    // } else {




    businesses.findOne({personal_email: personal_email}, function(err, user){
                if(err){
                    res.send(err);
                }else{
                  user.update({service_name:oldservice_name},function(err,found_service){
                    if(err){
                      res.send(err);
                      console.log(found_service);
                    }else{
                      found_service.service_pic=newservice_pic;
                      found_service.service_name=newservice_name;
                      found_service.service_Description=newservice_Description;
                      found_service.service_price=newservice_price;
                      found_service.service_pic=newpromotion_offer;
                      found_service.service_pic=newtype_flag;
                      found_service.service_pic=newavailable_flag;
                      console.log(newservice_name);
                      console.log(found_service);
});
found_service.save(function(err,saved_service){
if(err){
  console.log('err');
  res.send(err);
}else{
  console.log(user);
  res.send(saved_service);
}

});


                    }



//       if (err) { console.log(err); res.send(err); return;}
//       if (result) {
//       //  req.flash('success_msg', 'You edited your service');
//
//         res.redirect('/services');// page of services belong to my business
//       } else {
// //  req.flash('error_msg', 'error happened in editing the service please check your inouts');// error message for not finding the specified username to edit into
// res.render('service_edit'); // return to adding service page


}

});

//Export router
module.exports = router;
