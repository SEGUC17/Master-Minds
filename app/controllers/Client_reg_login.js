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





exports.register_clinet = function(req, res) {
    var fullName = req.body.fullName;
    var email = req.body.email;
    var username = req.body.username;
    var address = req.body.address;
    var phone_number = req.body.phone_number;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('fullName', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('phone_number', 'Phone Number is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newClient = new User({
            fullName: fullName,
            email: email,
            username: username,
            address: address,
            phone_number: phone_number,
            password: password
        });

        UserRegisterController.createUser(newClient, function(err, client) {

            if (err) throw err;
            console.log(client);
        });

        res.redirect('/login');
    }
}
