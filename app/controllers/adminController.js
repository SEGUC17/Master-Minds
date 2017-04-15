//Require dependencies
var fs = require('fs');
var clients = require('../../models/clients');
var businesses = require('../../models/businessOwners');

let adminController = {

    banUser: function (req, res) {
        //Banning User
        if (req.isAuthenticated()) {
            if (req.user.admin) {
                clients.findOne({ email: req.param('useremail') }, function (err, user) {
                    if (err)
                        res.send(err);

                    if (user) {
                        user.ban = true;
                        user.save(function (err, user) {
                            if (err)
                                res.send(err);

                            res.json({ "result": "Success" }); //Confirm success by returning JSON object with result field set to "Success".
                        });
                    } else {
                        res.json({ "result": "Failed" }); //Indicates failure to find user by returning JSON object with result field set to "Failed".
                    }
                });
            } else {
                res.json({ "result": "Failed" }); //Indicates failure if not admin.
            }
        } else {
            res.json({ "result": "Failed!" }); //Indicates failure if not admin.
        }
    },

    banBusiness: function (req, res) {
        if (req.isAuthenticated()) {
            if (req.user.admin) {
                businesses.findOne({ business_name: req.param('business_name') }, function (err, user) {
                    if (err)
                        res.send(err);
                    if (user) {
                        user.ban = true;
                        user.save(function (err, user) {
                            if (err)
                                res.send(err);
                            res.json({ "result": "Success" }); //Confirm success by returning JSON object with result field set to "Success".
                        });
                    } else {
                        res.json({ "result": "Failed" }); //Indicates failure to find user by returning JSON object with result field set to "Failed".
                    }
                });

            } else {
                res.json({ "result": "Failed" }); //Indicates failure if not admin.
            }
        } else {
            res.json({ "result": "Failed!" }); //Indicates failure if not admin.
        }
    },

    viewReportedReviews: function (req, res) {
        if (req.isAuthenticated()) {
            if (req.user.admin) {
            } else {
                res.json({ "result": "Failed!" }); //Indicates failure if not admin.
            }
        } else {
            res.json({ "result": "Failed!" }); //Indicates failure if not admin.
        }
    },

    deleteBusiness: function (req, res) {
        Business.findOne({ business_name: 'breakout' }, function (err, business) {
            business.remove({ business_name: 'breakout' });
            business.save();
        })
        res.render('homepageView');
    },

    viewUnacceptedApplications: function (req, res) {
        businesses.find({ accepted: false }, function (err, unaccepted) {
            res.send(unaccepted);
        })
    },

    acceptApplication: function (req, res) {
        businesses.findOne({ business_name: req.param('business') }, function (err, business) {
            business.accepted = true;
        })

    }

}

//Export Controller
module.exports = adminController;