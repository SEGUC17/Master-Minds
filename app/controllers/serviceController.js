//Require dependencies
var fs = require('fs');
var express = require('express');
var router = express.Router();
let businesses = require('../../models/businessOwners');

let serviceController = {

  addService: function (req, res) {
    var personal_email = req.body.personal_email;
    var service_pic = req.body.service_pic;
    var service_name = req.body.service_name;
    var service_Description = req.body.service_Description;
    var service_price = req.body.service_price;
    var type_flag = req.body.type_flag;
    var available_flag = req.body.available_flag;
    var promotion_offer = req.body.promotion_offer;
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
      businesses.findOne({ personal_email: personal_email }, function (err, Found_data) {
        if (err) {
          res.send(err);
        } else {
          Found_data.services.push({
            service_pic: service_pic,
            service_name: service_name,
            service_Description: service_Description,
            service_price: service_price,
            promotion_offer: promotion_offer,
            type_flag: type_flag,
            available_flag: available_flag
          });
          console.log(Found_data);
          Found_data.save(function (err, saved) {
            if (err) {
              console.log('err');
              res.send(err);
            } else {
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

  rateService: function (req, res) {
    var business = new businesses();
    var req_business = req.param('business');
    var req_service = req.param('service');
    business.findOneAndUpdate({
      'business_name': req_business,
      'services.service_name': req_service,
      'services.service_rating.username': req.user.username
    }, {
        '$set': {
          'services.$.rating': req.body.rating
        }
      }, function (err, found_business) {
        if (err) {
          console.log(401);
          res.status(401).send('error happend while looking for the business in the Post_Rate_Business');
        }
        else if (!found_business) {
          var new_rate = {
            "username": req.user.username,
            "rating": req.body.rating
          };
          business.findOneAndUpdate({ 'business_name': req_business, 'services.service_name': req_service }, {
            "$push": {
              'services.service_rating': new_rate
            }
          }, function (err, found_business) {
            if (err) {
              console.log(err);
              res.status(401).send("error");
            }
            else if (!found_business) {
              console.log(found_business);
              res.status(401).send("no business");
            }
            else {
              console.log(200);
              res.status(200).send("added");
            }
          });
        }
        else {
          console.log(200);
          res.status(200).send("added");
        }
      });
  },

  reviewService: function (req, res) {
    var business = require('mongoose').model('businesses');
    var req_business = req.param('business');
    var req_service = req.param('service');
    var new_rate = {
      "username": req.user.username,
      "review": req.body.review,
      "report": 0
    };
    console.log(new_rate);
    business.findOneAndUpdate({ 'business_name': req_business, 'services.service_name': req_service }, {
      "$push": {
        'services.service_reviews': new_rate
      }
    }, function (err, found_business) {
      if (err) {
        console.log(err);
        res.status(401).send("error");
      }
      else if (!found_business) {
        console.log("no business");
        res.status(401).send("no business");
      }
      else {
        console.log(found_business);
        res.status(200).send("added");
      }
    });
  },

  reportServiceReview: function (req, res) {
    /*
    I will get a post request from the detailed product view when the button of the report on 
    a certain review is clicked. The product name, the business name and the review content 
    will be passed from the view to this function in the product controller. 
    This function should search for the review in the business and set the reported flag true.
    */
    if (req.param('report') == 'true' && session.username != null) {
      businesses.findOne({ business_name: req.param('businessname') }, function (err, business) {
        for (var i = 0; i < business.services.length; i++) {
          if (business.services[i].service_name == req.param('product')) {
            for (var j = 0; j < business.services[i].service_reviews.length; j++) {
              if (business.services[i].service_reviews[j].review == req.body.review) {
                business.services[i].service_reviews[j].reported++;
                business.save();
                res.render('detailedProductView', { 'review': req.param('review') }); //To change the report button on this review as reported
                return;
              }
            }
          }
        }
        business.save();
        res.render('detailedProductView');
        return;
      });
    } else
      res.render('detailedProductView');
  },

  viewServiceRating: function (req, res) {
    var business = require('mongoose').model('businesses');
    var req_business = req.param('business');
    var req_service = req.param('service');
    business.find({ 'business_name': req_business }, function (err, found_business) {
      if (err) {
        console.log(401);
        res.status(401).send('error happend while looking for the service in the Get_Rate_Service');
      }
      else if (!found_business || !found_business[0]) {
        console.log(401);
        res.status(401).send('no service found error happend in the Get_Rate_Service');
      }
      else {
        var fname_of_service_found = 0;
        var output = 0;
        var obj_ser = found_business[0].services;
        if (!obj_ser) {
          console.log("no services");
          res.status(401).send("the business has no services yet");
        }
        else {
          for (var i = 0; i < obj_ser.length; i++) {
            var obj_ser_name = obj_ser[i];

            if (obj_ser_name.service_name == req_service) {

              var obj_ser_rating = obj_ser[i].service_rating;

              fname_of_service_found = 1;
              for (var j = 0; j < obj_ser_rating.length; j++) {
                var obj_ser_rating_1 = obj_ser_rating[i];
                output += obj_ser_rating_1.rating;
              }
            }
          }
          if (fname_of_service_found == 1) {
            console.log(200);
            output /= obj_ser_rating.length;
            console.log(output);
            res.status(200).send(output + "");
          }
          else {
            console.log('service not found');
            res.status(401).send("service not found");
          }
        }
      }
    });
  },

  viewServiceReviews: function (req, res) {
    var business = require('mongoose').model('businesses');
    var req_business = req.param('business');
    var req_service = req.param('service');
    business.find({ 'business_name': req_business }, function (err, found_business) {
      if (err) {
        console.log(401);
        res.status(401).send('error happend while looking for the service in the Get_Review_Service');
      }
      else if (!found_business || !found_business[0]) {
        console.log(401);
        res.status(401).send('no service found error happend in the  Get_Review_Service');
      }
      else {
        var services = found_business[0].services;
        if (!services || !services[0]) {
          console.log(404);
          res.status(404).send('no service found');
        }
        else {
          var total = "here is the reviews:\n\n";
          var ffound = 0;
          for (var i = 0; i < services.length; i++) {
            if (services[i].service_name == req_service) {
              ffound = 1;
              var reviews = services[i].service_reviews
              if (!reviews || !reviews[0]) {
                console.log(404);
                res.status(404).send('no reviews found');
              }
              else {
                for (var j = 0; j < reviews.length; j++) {
                  total += reviews[j].review + "\n";
                }

              }
            }
          }
          if (ffound == 1) {
            console.log(200);
            res.status(200).send(total);
          }
          else {
            console.log(404);
            res.status(404).send("no services found");
          }
        }
      }
    });
  },

  viewServices: function (req, res) {
    var business = req.param('businessname')
    BusinessOwner.findOne({ business_name: business }, function (err, service) {
      if (err) {
        res.send(err);
      } else {
        console.log('Hi');
        res.send(service);
      }
    });
  }

}

//Export controller
module.exports = serviceController;
