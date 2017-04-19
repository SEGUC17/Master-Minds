//Require dependencies
var fs = require('fs');
var express = require('express');
var router = express.Router();
let businesses = require('../../models/businessOwners');

module.exports.getbusinessownerByEmail = function(personal_email, callback) {
    var query = { personal_email: personal_email };
    businesses.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
    businesses.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {

        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    }

let  serviceController={

addservice:function(req,res){
if (req.user)
      var personal_email=req.user.personal_email;//check
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

res.status(500).send(err);
          }else{
            if(Found_data == null){
            // if no matches sending error  because his email not in the database
                res.send("error happened while editing your service no matched email in the data base please  try again");
  //              res.render('service_add');// front end service edit
            }else{
            var x=false;
            for (var i = 0; i < Found_data.services.length; i++) {//checking if owner have service name with the same service name he wants to add
              if(Found_data.services[i].service_name==service_name){
                x=true;
                  res.send("error happened in adding the service you already have servic name with this name");
              }
            }
            if(x==false){
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
          //    res.send(Found_data);
            //  res.redirect('/services');// page of services belong to my business
              res.send("you added your service");
            }
          })

        }
      }
    }
      });
          }
},

editservice:function(req,res){

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
    //  res.render('service_edit');// front end service edit
    }else{
    if(oldservice_name==""||oldservice_name==null){
      res.send("you must enter  your old service_name  to edit  it ");
      //res.render('service_edit');// front end service edit
    }else{
      // finding the business_owner from database
      businesses.findOne({personal_email: personal_email}, function(err, user){
                  if(err){
res.status(500).send(err);
                  }else{
                    if(user == null){
                      // if no matches sending error  because his email not in the database
                        res.send("error happened while editing your service no matched email in the data base please  try again");
          //              res.render('service_edit');// front end service edit
                    }
                    else{
                    var x=false;
                    for (var i = 0; i < user.services.length; i++) {//checking if owner have service name with the same service name he wants to edit
                      if(user.services[i].service_name==newservice_name){
                        x=true;
                          res.send("error happened in editing the service you already have service name with this name");
                      }
                    }
                    if(x==false){
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
      // res.render('service_edit');// front end service edit
     }else{
       // confirmation for editing database
       //res.send(saved_service);
       //res.redirect('/services');// page of services belong to my business
       res.send("you edited your service");
     }

     });
  }
}
}
                  });
    }
  }

}


}

//Export controller
module.exports = serviceController;
