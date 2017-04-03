var passport = require('passport');
var BusinessOwner = require('../models/businessOwners');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('subscribe', new LocalStrategy({
    usernameField: 'personal_email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('personal_email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
    req.checkBody('business_name', 'Please enter business name').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
           messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    BusinessOwner.findOne({'personal_email': email}, function (err, owner) {
        if (err) {
            return done(err);
        }
        if (owner) {
            return done(null, false, {message: 'Email is already in use.'});
        }
        BusinessOwner.findOne({'business_name' : req.body.business_name}, function(err, owner){
            if(err){
                return done(err);
            }
            if(owner){
                return done(null, false, {message: 'There is already a business with that name.'});
            }
            var newOwner = new BusinessOwner();
            newOwner.personal_email = email;
            newOwner.password = newOwner.encryptPassword(password);
            newOwner.business_name = req.body.business_name;
            newOwner.fullname = req.body.fullname;
            newOwner.business_description = req.body.business_description;
            var a = req.body.business_emails;
            var arr = a.split(', ');
            for(i=0;i<arr.length;i++){
                newOwner.business_emails.push({email: arr[i]});
            }
            newOwner.associated_bank = req.body.associated_bank;
            newOwner.business_website = req.body.business_website;
            newOwner.business_logo = null;
            newOwner.business_reviews_and_reports = [];
            newOwner.rating = [];

            newOwner.save(function(err, result) {
                if (err) {
                    return done(err);
                }
                return done(null, newOwner);
            });
        });
    });
}));