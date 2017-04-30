//Require dependencies
let businesses = require('../../models/businessOwners');
let advertisements = require('../../models/advertisements');
let session = require('express-session');

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
        console.log(req.body)
        if (!req.user)
            return res.json({ 'result': 'failure', 'message': 'please login' });
        businesses.findOne({ business_name: req.param('business') }, function (err, business) {
            var service_review_test;
            if (err)
                return res.json({ 'result': 'failure', 'message': 'business not found' });
            if (!business)
                return res.json({ 'result': 'failure', 'message': 'business not found' });
            for (var i = 0; i < business.services.length; i++) {
                if (business.services[i].service_name == req.param('service')) {
                    for (var j = 0; j < business.services[i].service_reviews.length; j++) {
                        if (business.services[i].service_reviews[j].review == req.body.review && req.body.username == business.services[i].service_reviews[j].username) {
                            if (req.user.username == business.services[i].service_reviews[j].username){
                                service_review_test = business.services[i].service_reviews[j];
                                return res.json({ 'result': 'failure', 'message': 'you cannot report yourself' });
                            }
                            for (k = 0; k < business.services[i].service_reviews[j].reportedArray.length; k++) {
                                if (req.user.username == business.services[i].service_reviews[j].reportedArray[k].usernames) {
                                    console.log(business.services[i].service_reviews[j].reportedArray[k].usernames);
                                    res.json({ "result": "failure", "message": "you have already reported once" });
                                    return;
                                }
                            }
                            business.services[i].service_reviews[j].reported++;
                            var newUsername = { "usernames": req.user.username };
                            business.services[i].service_reviews[j].reportedArray.push(newUsername);
                            business.save();
                            return res.json({ 'result': 'success', 'message': 'reported successfully' });
                        }
                    }
                }
            }
            return res.json({ 'result': 'failure', 'message': 'review not found' });
        });
    },

    addAdvertisment: function (req, res) {
        /*
        Get a post request from the view from the business owner on a service he wants to advertise and
        save it in the database or reject it
        */
        var found = false;
        if (req.user) {  //If business owner press the 'advertise' button
            businesses.findOne({ personal_email: req.user.personal_email }, function (err, business) { //Get the business
                if (err) return res.json({ 'result': 'failure', 'message': 'error on database' });
                if (!business)
                    return res.json({ 'result': 'failure', 'message': 'business not found' })
                for (var i = 0; i < business.services.length; i++) {
                    if (business.services[i].service_name == req.param('product')) {
                        found = true;
                    }
                }
                if (found == true) {
                    advertisements.find({}, function (err, ads) {
                        if (ads.length > 12) {  //Cannot advertise more than 12 advertisements on the website
                            return res.json({ 'result': 'failure', 'message': 'number of ads on website exceeded' })
                        } else {
                            var advertised = false;
                            for (var i = 0; i < ads.length; i++) {
                                if (ads[i].business_name == business.business_name) {    //check that the same business doesn't advertise twice
                                    advertised = true;
                                }
                            }
                            if (advertised == false) {   //The business did not make a previous advertisment
                                // businesses.findOne({ business_name: business.business_name }, function (err, business) {
                                //     //Check whether the service to be advertised has a picture not
                                //     for (var i = 0; i < business.services.length; i++) {
                                //         if (business.service[i].service_name == req.param('servicename') && business.service[i].service_pic != null) {
                                //             err.message('Sorry your service need to have an image to be advertised');
                                //         }
                                //     }
                                // })
                                var ad = new advertisements();
                                ad.business_name = business.business_name;
                                ad.service_name = req.param('product');
                                ad.date = new Date();
                                ad.save();  //Saving the new advertisement to the database
                                return res.json({ 'result': 'success', 'message': 'advertisement successful' });
                            } else {
                                return res.json({ 'result': 'failure', 'message': 'you already have a service advertised' });
                            }
                        }
                    })
                } else {
                    return res.json({ 'result': 'failure', 'message': 'this is not one of your products' });
                }
            })

        }
    },

    viewAdvertisements: function (req, res) {
        /*
        Choose random 4 ads from the database and send them to the view.
        Should be view in the directory page
        */
        advertisements.find({}, function (err, ad) {
            if (err)
                return res.json({ 'result': 'failure', 'message': 'Error accessing database' });
            if (!ad)
                return res.json({ 'result': 'failure', 'message': 'No advertisements' });
            if (ad.length == 0) {
                res.json({ 'result': 'failure', 'message': 'There are no ads to view' });
                return;
            }
            else {
                for (var i = 0; i < ad.length; i++) {
                    if (((new Date().getDate()) - ad[i].date.getDate()) > 7 || (((new Date().getDate()) - ad[i].date.getDate()) <= -24 && ((new Date().getMonth()) - ad[i].date.getMonth()) > 1)) {
                        ad[i].remove();
                    }
                }
                var adArray = [];   //Array of 4 randomly chosen advertisements
                advertisements.find({}, function (err, ads) {
                    if (err)
                        return res.json({ 'result': 'failure', 'message': 'Error accessing database' });
                    if (!ads)
                        return res.json({ 'result': 'failure', 'message': 'No Advertisements' });
                    if (ads.length == 0) {
                        res.json({ 'result': 'failure', 'message': 'There are no ads to view' });
                        return;
                    }
                    else {
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
                        res.json({ 'result': 'success', 'message': 'advertisementsView', 'content': adArray });    //Pass the chosen ads to the view
                    }
                })

            }
        })


    }
}



//Export controller
module.exports = productContoller;
