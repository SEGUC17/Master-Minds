var fs = require('fs');
var express = require('express');
var router = express.Router();
var validator = require('express-validator');
var homepageController = require('./hompageController');
var likeBusinessController = require('./likeBusinessController');
var BusinessOwner = require('../../models/businessOwners');
var Admin = require('../../models/admins');
var Client = require('../../models/clients');
var multer = require('multer');
var upload = multer({ dest: '../../public/businessowner' });
var upload_client = multer({ dest: '../../public/businessowner' });
var viewController = require('./viewController');
var profileController = require('./profileController');
var productController = require('./productController');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/clients');
var UserRegisterController = require('./ClientRegisterController');
var UserLoginController = require('./ClientLoginController');
var adminLoginController = require('./adminLoginController');
var adminFunctionsController = require('./adminFunctionsController');
var replyController = require('./replyController');
var Deletebussinesowner= require('./Deletebussinesowner');

let session = require('express-session');
let businesses = require('../../models/businessOwners');

var view_unaccepted_businesses = require('./view_unaccepted_businesses');
var RateAndReviewCtrl = require('./RateAndReviewCtrl.js');
var path = require('path');


exports.add_service= function(req,res)

  {
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
//    res.render('service_add'); // front end view for service_add
  }else{
    if(service_name==""||service_name==null){
      res.send("you must enter  your  service_name to add service");
//res.render('service_add');// front end view for service_add
    }else{
      if(service_Description==""||service_Description==null){
        res.send("you must enter  your  service_Description to add service ");
//        res.render('service_add');// front end view for service_add
      }else{
        if(service_price==""||service_price==null){
          res.send("you must enter  your service_price to add service ");
//          res.render('service_add');// front end view for service_add
        }else{
          // getting the business owner from the database to add in it the service
          businesses.findOne({personal_email:personal_email},function(err,Found_data){
            if(err){
              // if no email mathes error appears
//              res.send("error happened while adding your service no personal email matches businessOwner please check your email again");
//              res.render('service_add');// front end view for service_add
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
//                res.send("error happened while adding your service please try again");
//                res.render('service_add');// front end view for service_add
                res.send(err);
              }else{

            //    res.redirect('/services');// page of services belong to my servies
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
  }

  exports.edit_service= function(req,res)

    {
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

}
