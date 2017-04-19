//Require dependencies
var fs = require('fs');
var express = require('express');
var router = express.Router();
let businesses = require('../../models/businessOwners');

let  serviceController={

addservice:function(req,res){

      var personal_email=req.body.personal_email;
      var service_pic = req.body.service_pic;
      var service_name = req.body.service_name;
      var service_Description = req.body.service_Description;
      var service_price = req.body.service_price;
      var type_flag=req.body.type_flag;
      var available_flag=req.body.available_flag;
      var promotion_offer=req.body.promotion_offer;

      // Validation
      req.checkBody('personal_email', 'personal_email is required').notEmpty();
      req.checkBody('service_name', 'service_name is required').notEmpty();
      req.checkBody('service_Description', 'service_Description is required').notEmpty();
      req.checkBody('service_price', 'service_price is required').notEmpty();



     var errors = req.validationErrors();

      if (errors) {
          res.render('service_add', {      // page of services belong to my business
              errors: errors


          });
          res.send("error happened in adding the service please check your inputs");
      } else {
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
              res.redirect('/services');// page of services belong to my business
              res.send("you added your service");
            }
          })

        }
      });
          }
},

editservice:function(req,res){

}


}

//Export controller
module.exports = serviceController;
