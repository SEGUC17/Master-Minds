//Require dependencies
let businesses = require('../../models/businessOwners');
let advertisements = require('../../models/advertisements');

let productContoller = {
    reportServiceReview: function (req, res) {
        /*
        I will get a post request from the detailed product view when the button of the report on 
        a certain review is clicked. The product name, the business name and the review content 
        will be passed from the view to this function in the product controller. 
        This function should search for the review in the business and set the reported flag true.
        */

        /* Adding values to be tested on in the database */
        //   var business = new businesses();
        //   business.personal_email = 'genedymohamed96@gmail.com';
        //   business.business_name = 'breakout';
        //   business.save();
        //   business.services.push({service_name: "room", service_reviews:[{review: "hello" }]});
        //   business.save();
        //  business.services.service_name = 'room';
        //  business.save();

        if (req.param('report') == true) {
            businesses.findOne({ business_name: req.param('businessname') }, function (err, business) {
                for (var i = 0; i < business.services.length; i++) {
                    if (business.services[i].service_name == req.param('servicename')) {
                        for (var j = 0; j < business.services[i].service_reviews.length; j++) {
                            if (business.services[i].service_reviews[j].review == req.param('review')) {
                                business.services[i].service_reviews[j].reported++;
                                res.render('detailedProductView', req.param('review')); //To change the report button on this review as reported
                                break;
                            }
                        }
                    }
                }
                business.save();
            });
        }
        res.render('detailedProductView');
    },

    addAdvertisment: function (req, res) {
        /*
        Get a post request from the view from the business owner on a service he wants to advertise and 
        save it in the database or reject it
        */
        if (req.param('ad') == 'true') {  //If business owner press the 'advertise' button
            advertisements.find({}, function (err, ads) {
                if (ads.length > 12) {  //Cannot advertise more than 12 advertisements on the website
                    err.message('Cannot add another advertisement at the moment');
                    res.render('detailedProductView');
                } else {
                    var advertised = false;
                    for (var i = 0; i < ads.length; i++) {
                        if (ads.business_name == req.param('businessname')) {    //check that the same business doesn't advertise twice
                            advertised = true;
                        }
                    }
                    if (advertised == false) {   //The business did not make a previous advertisment
                        // businesses.findOne({ business_name: req.param('businessname') }, function (err, business) {
                        //     //Check whether the service to be advertised has a picture not
                        //     for (var i = 0; i < business.services.length; i++) {
                        //         if (business.service[i].service_name == req.param('servicename') && business.service[i].service_pic != null) {
                        //             err.message('Sorry your service need to have an image to be advertised');
                        //         }
                        //     }
                        // })
                        var ad = new advertisements();
                        ad.business_name = req.param('businessname');
                        ad.service_name = req.param('product');
                        ad.save();  //Saving the new advertisement to the database
                    } else {
                        err.message('You already have a service advertised');
                    }
                }
            })
        }
        res.render('detailedProductView');
    },

    viewAdvertisements: function (req, res) {
        /*
        Choose random 4 ads from the database and send them to the view.
        Should be view in the directory page
        */
        advertisements.find({}, function(err, ad){
            for (var i = 0; i < ad.length; i++){
                if (((new Date().getDate()) - ad[i].date.getDate()) > 7 || ((new Date().getDate()) - ad[i].date.getDate()) >= -24 || ((new Date().getMonth()) - ad[i].date.getMonth()) > 1){
                    ad[i].remove();
                }
            }
        })
        var adArray = [];   //Array of 4 randomly chosen advertisements
        advertisements.find({}, function (err, ads) {
            if (ads.length > 1) {   //There must be atleast 1 advertisement in the database
                for (var i = 0; i < 4;) {   //To add only 4 ads to the view
                    var random = Math.floor(Math.random() * 11);    //Choose a random from the max. of 12 ads you can have in the database
                    if (random < ads.length) {  //To assure no array index out of bounds
                        adArray[i] = ads[random];  // Add the randomly chosen ad to the array of ads
                        i++;    //Start seeking the next ad to be viewed
                    }
                }
            }
            // console.log(adArray);
            res.render('advertisementsView', { adArray });    //Pass the chosen ads to the view
        })
    }

}

//Export controller
module.exports = productContoller;