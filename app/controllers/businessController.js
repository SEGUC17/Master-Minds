//Require dependencies
let businesses = require('../../models/businessOwners');
let session = require('express-session');

let businessController = {

    rateBusiness: function (req, res) {
        if (!req.user) {
            console.log(401);
            res.status(401).send("plz log in plz");
        }
        var business = new businesses();
        var req_business = req.param('business');
        business.findOneAndUpdate({ 'business_name': req_business, 'business_rating.username': req.user.username }, {
            '$set': {
                'business_rating.$.rating': req.body.rating
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
                console.log(new_rate);
                console.log(req.body.rating);
                business.findOneAndUpdate({ 'business_name': req_business }, {
                    "$push": {
                        'business_rating': new_rate
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

    reviewBusiness: function (req, res) {
        if (!req.user) {
            console.log(401);
            res.status(401).send("plz log in plz");
        }
        var business = new busninesses();
        var req_business = req.param('business');
        var new_rate = {
            "username": req.user.username,
            "review": req.body.review,
            "report": 0
        };
        console.log(new_rate);
        business.findOneAndUpdate({ 'business_name': req_business }, {
            "$push": {
                'business_reviews': new_rate
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

    viewBusinessRating: function (req, res) {
        var business = require('mongoose').model('businesses');
        var req_business = req.param('business');

        business.find({ 'business_name': req_business }, function (err, found_business) {
            if (err) {
                console.log(401);
                res.status(401).send('error happend while looking for the business in the Get_Rate_Business');
            }
            else if (!found_business || !found_business[0]) {
                console.log(401);
                res.status(401).send('no business found error happend in the Get_Rate_Busines');
            }
            else {
                var obj_rate = found_business[0].business_rating;
                if (!obj_rate || !obj_rate[0]) {
                    console.log(401);
                    res.status(401).send('no business found error happend in the Get_Rate_Busines');
                }
                else {
                    var rate = 0;
                    for (var i = 0; i < obj_rate.length; i++) {
                        rate += obj_rate[i].rating;
                    }
                    console.log(200);
                    rate /= obj_rate.length;
                    res.status(200).send(rate + "");
                }
            }
        });
    },

    viewBusinessReviews: function (req, res) {
        var business = require('mongoose').model('businesses');
        var req_business = req.param('business');
        business.find({ 'business_name': req_business }, function (err, found_business) {
            if (err) {
                console.log(401);
                res.status(401).send('error happend while looking for the business in the Get_Review_Business');
            }
            else if (!found_business || !found_business[0]) {
                console.log(401);
                res.status(401).send('no business found error happend in the  Get_Review_Business');
            }
            else {
                var reviews = found_business[0].business_reviews;
                var total = "here is the reviews:\n\n";
                if (!reviews || !reviews[0]) {
                    console.log(404);
                    res.status(404).send("there is no reviews");
                }
                else {
                    for (var i = 0; i < reviews.length; i++) {
                        total += reviews[i].review;
                        total += ", \n";
                    }
                    console.log(200);
                    res.status(200).send(total);
                }
            }
        });
    },

    reportBusinessReview: function (req, res) {
        if (!req.user) {
            console.log(401);
            res.status(401).send("plz log in plz");
        }
        var business = require('mongoose').model('businesses');
        var req_business = req.param('business');
        var req_review = req.body.review;
        if (req_review && req_business)
            business.findOneAndUpdate({ 'business_name': req_business, 'business_reviews.review': req_review }, { '$inc': { 'business_reviews.$.reported': 1 } }, function (err, found_business) {
                if (err) {
                    console.log(401);
                    res.status(401).send('Error happend while looking for the business in the Report_Business_Review');
                }
                else if (!found_business) {
                    console.log(401);
                    res.status(401).send('No business found error happend in the Report_Business_Review');
                }
                else {
                    console.log(200);
                    res.status(200).send("report added");
                }
            });
    },

    likeBusiness: function (req, res) {
        //Get name of business to be liked from the request
        var business = req.body.name;
        //Get current user's email
        var email = req.user.email;
        console.log(email);
        //locates the current client
        clients.findOne({ email: email }, function (err, client) {
            if (err) {
                res.status(404).send();
            } else {
                //adds the liked business to the liked Array
                client.liked.push({ "business_names": business });
                //Updates the client in the database
                client.save(function (err) {
                    if (err) {
                        res.status(500).send();
                    } else {
                        res.status(200).send();
                        console.log("Business added to favorites");
                    }
                });
            }
        });
    },

    unlikeBusiness: function (req, res) {
        //Get name of business to be unliked from the request
        var business = req.body.name;
        //Get current User's email
        var email = req.user.email;
        //locate the current client
        clients.findOne({ email: email }, function (err, client) {
            if (err) {
                res.status(404).send();
                console.log("client not found");
            } else {
                //Loops on the liked array and filters out the entry with the specified name from the rest
                client.liked = client.liked.filter(function (el) {
                    //returns the filtered array
                    return el.business_names !== business;
                });
                client.save(function (err) {
                    // Now client is saved, save function runs asynchronously
                    res.status(200).send();
                    console.log('business unliked');
                });
            }
        });
    },

    viewLikedBusinesses: function (req, res) {
        //Get current user's email
        var email = req.user.email;
        //locates the current client
        clients.findOne({ email: email }, function (err, client) {
            if (err) {
                res.status(404).send;
                console.log("Client not Found");
            } else {
                //Returns the liked array from the found client object
                res.send(client.liked);
                console.log("Liked Businesses Returned");
            }
        });
    },

    businessPostReply: function (req, res) {
        var business = new Business();
        Business.findOne({ business_name: 'breakout', personal_email: 'genedymohamed96@gmail.com' }, function (err, business) {
            business.business_reviews.push({ review: 'bad' });
            business.save();
            res.console.log(200);
            res.status(200).send('Reply Successfully Posted');
        })
        res.render('homepageView');
    },

    viewBusiness: function (req, res) {
        var search = req.query.search;
        console.log(search);
        if (search) {
            businesses.find({ business_name: search }, function (err, business) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(business);
                    if (business.length == 0) {
                        res.status(404).send('Business not found');
                    } else {
                        res.send(business);
                    }
                }
            });
        } else {
            businesses.find({}, function (err, business) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (business.length == 0) {
                        res.status(404).send('Business not found');
                    } else {
                        res.send(business);
                    }
                }
            });
        }
    },

    addService: function (req, res) {
        //getting data from user to add it in his services array
        var business = new businesses();
        var personal_email = req.body.personal_email;
        var service_pic = req.body.service_pic;
        var service_name = req.body.service_name;
        var service_Description = req.body.service_Description;
        var service_price = req.body.service_price;
        var type_flag = req.body.type_flag;
        var available_flag = req.body.available_flag;
        var promotion_offer = req.body.promotion_offer;
        // Validation
        if (personal_email == "" || personal_email == null) {
            res.send("you must enter  your personal email to add service");
            //  res.render('service_add'); // front end view for service_add
        } else {
            if (service_name == "" || service_name == null) {
                res.send("you must enter  your  service_name to add service");
                // res.render('service_add');// front end view for service_add
            } else {
                if (service_Description == "" || service_Description == null) {
                    res.send("you must enter  your  service_Description to add service ");
                    // res.render('service_add');// front end view for service_add
                } else {
                    if (service_price == "" || service_price == null) {
                        res.send("you must enter  your service_price to add service ");
                        // res.render('service_add');// front end view for service_add
                    } else {
                        // getting the business owner from the database to add in it the service
                        businesses.findOne({ personal_email: personal_email }, function (err, Found_data) {
                            if (err) {
                                // if no email mathes error appears
                                res.send("error happened while adding your service no personal email matches businessOwner please check your email again");
                                // res.render('service_add');// front end view for service_add
                                // res.send(err);

                            } else {
                                // pushing the data of serivces the business_owner want's to add
                                Found_data.services.push({
                                    service_pic: service_pic,
                                    service_name: service_name,
                                    service_Description: service_Description,
                                    service_price: service_price,
                                    promotion_offer: promotion_offer,
                                    type_flag: type_flag,
                                    available_flag: available_flag
                                });

                                Found_data.save(function (err, saved) {//saving the database after pushing
                                    if (err) {
                                        // error sent to user if error happened while saving database
                                        res.send("error happened while adding your service please try again");
                                        //res.render('service_add');// front end view for service_add
                                        //res.send(err);
                                    } else {

                                        //  res.redirect('/services');// page of services belong to my servies
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
    },

    editService: function (req, res) {
        // data we want to edit in the service  business_owner must add personal email so we can get his data from database
        var personal_email = req.body.personal_email;
        var newservice_pic = req.body.newservice_pic;
        var oldservice_name = req.body.oldservice_name;// business_owner must enter oldservice_name so i can know where to edit
        var newservice_name = req.body.newservice_name;
        var newservice_Description = req.body.newservice_Description;
        var newservice_price = req.body.newservice_price;
        var newpromotion_offer = req.body.newpromotion_offer;
        var newtype_flag = req.body.newtype_flag;
        var newavailable_flag = req.body.newavailable_flag;
        // Validation
        if (personal_email == "" || personal_email == null) {
            res.send("you must enter  your personal email to edit ");
            // res.render('service_edit');// front end service edit
        } else {
            if (oldservice_name == "" || oldservice_name == null) {
                res.send("you must enter  your old service_name  to edit  it ");
                //res.render('service_edit');// front end service edit
            } else {
                // finding the business_owner from database
                businesses.findOne({ personal_email: personal_email }, function (err, user) {
                    if (err) {
                        // if no matches sending error  because his email not in the database
                        res.send("error happened while editing your service no matched email in the data base please  try again");
                        //    res.render('service_edit');// front end service edit
                    } else {
                        for (var i = 0; i < user.services.length; i++) {
                            // searching for his specific service from the array of Services and then edit his data
                            if (user.services[i].service_name == oldservice_name) {
                                user.services[i].service_pic = newservice_pic;
                                user.services[i].service_name = newservice_name;
                                user.services[i].service_Description = newservice_Description;
                                user.services[i].service_price = newservice_price;
                                user.services[i].promotion_offer = newpromotion_offer;
                                user.services[i].type_flag = newtype_flag;
                                user.services[i].available_flag = newavailable_flag;
                            }
                        }
                        user.save(function (err, saved_service) {// save database after editing
                            if (err) {
                                // sending error if did not save the database
                                res.send("error happened while editing your service please try again");
                                // res.render('service_edit');// front end service edit
                            } else {
                                // confirmation for editing database
                                // res.send(saved_service);
                                // res.redirect('/services');// page of services belong to my business
                                res.send("you edited your service");
                            }

                        });
                    }
                });
            }
        }
    },

    subscribe: function (req, res) {
        // check for any mistakes or lack of input in the input form
        req.checkBody('personal_email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
        req.checkBody('business_name', 'Please enter business name').notEmpty();
        req.checkBody('fullName', "Please enter business owner's name").notEmpty();
        req.checkBody('business_description', 'PLease enter business description').notEmpty();
        req.checkBody('business_emails', 'Please enter business emails').notEmpty();
        req.checkBody('associated_bank', 'Please enter associated bank info').notEmpty();
        var errors = req.validationErrors();
        var messages = [];
        var flag = 1;
        if (!req.file) {
            flag = 0; // flag set to 0 if no file has been uploaded
            messages.push('Need to upload a business logo'); //  check whether business logo has been uploaded or not
        }
        if (errors) {
            errors.forEach(function (error) {
                messages.push(error.msg); // prepare the error messages that will be shown
            });
            if (flag) // ** if there are errors, and hence nothing will be inserted into the db, remove the file that upload.single uploaded
                fs.unlink('./public/businessowner/' + req.file.filename);
            req.flash('error', messages); // flash error messages
            return res.redirect('/subscribe');
        }
        BusinessOwner.findOne({ 'personal_email': req.body.personal_email }, function (err, owner) { //check that email is unique
            if (err) {
                return console.error(err);
            }
            if (owner) {
                fs.unlink('./public/businessowner/' + req.file.filename); // same as **
                req.flash('error', 'Email is already in use.'); // flash error message
                return res.redirect('/subscribe');
            }
            BusinessOwner.findOne({ 'business_name': req.body.business_name }, function (err, owner) { // check that business name is unique
                if (err) {
                    return console.error(err);
                }
                if (owner) {
                    fs.unlink('./public/businessowner/' + req.file.filename); //  same as **
                    req.flash('error', 'There is already a business with that name.'); // flash error message
                    return res.redirect('/subscribe');
                }
                console.log(req.body);
                var newOwner = new BusinessOwner(); // insert data into database
                newOwner.personal_email = req.body.personal_email;
                newOwner.password = newOwner.encryptPassword(req.body.password);
                newOwner.business_name = req.body.business_name;
                newOwner.fullname = req.body.fullname;
                newOwner.business_description = req.body.business_description;
                newOwner.business_logo = req.file.filename;
                var a = req.body.business_emails;
                var arr = a.split(',');
                for (i = 0; i < arr.length; i++) {
                    newOwner.business_emails.push({ email: arr[i] });
                }
                newOwner.associated_bank = req.body.associated_bank;
                newOwner.business_website = req.body.business_website;
                newOwner.business_reviews_and_reports = [];
                newOwner.rating = [];
                newOwner.accepted = false; // shows that this business is pending approval by the admin to be shown on the directory


                newOwner.save(function (err, result) {
                    if (err) return console.error(err);
                    res.send('ok');
                });
            });
        });
    },

    editProfile: function (req, res) {
        BusinessOwner.findOne({ 'personal_email': req.user.personal_email }, function (err, user) { // access the logged in user's information
            var waitForCallback = 0;
            if (req.body.business_name) {
                waitForCallback = 1;
                BusinessOwner.findOne({ 'business_name': req.body.business_name }, function (err, owner) { // check if new business name is taken
                    if (err) {
                        return console.error(err);
                    }
                    if (owner) {
                        req.flash('error', 'There is already a business with that name.');
                        return res.redirect('/editboprofile');
                    }
                    req.user.business_name = req.body.business_name;
                    waitForCallback = 0;
                });
            }
            while (waitForCallback);
            if (req.body.personal_email) {
                waitForCallback = 1;
                BusinessOwner.findOne({ 'personal_email': req.body.personal_email }, function (err, owner) { // check if new email is used already
                    if (err) {
                        return console.error(err);
                    }
                    if (owner) {
                        req.flash('error', 'That email address is already in use.');
                        return res.redirect('/editboprofile');
                    }
                    user.personal_email = req.body.personal_email;
                    waitForCallback = 0;
                });
            }
            while (waitForCallback);
            if (req.body.password)  // keep assigning new values (if any)
                user.password = user.encryptPassword(req.body.password);
            if (req.body.address)
                user.address = req.body.address;
            if (req.body.fullname)
                user.fullname = req.body.fullname;
            if (req.body.business_emails) {
                user.business_emails = [];
                var a = req.body.business_emails;
                var arr = a.split(',');
                for (i = 0; i < arr.length; i++) {
                    user.business_emails.push({ email: arr[i] });
                }
            }
            if (req.body.business_description)
                user.business_description = req.body.business_description;
            if (req.body.associated_bank)
                user.associated_bank = req.body.associated_bank;
            if (req.body.business_website)
                user.business_website = req.body.business_website;
            if (req.body.address)
                user.address = req.body.address;
            if (req.file) {
                user.business_logo = req.file.filename;
            }
            user.save(function (err) {
                if (err) return console.error(error);
                res.send('Profile Updated');
            });
        });
    }

}

//Export controller
module.exports = businessController;