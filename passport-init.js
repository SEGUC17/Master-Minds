var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Admins = mongoose.model('admins');
var Post = mongoose.model('Post');
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.username);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {

        Admins.findById(id, function(err, user){

        console.log('deserializing user:',user.username);
        return done(err, user);

    });

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 

            Admins.findOne({'username': username}, function(err, user){

                if(err){
                    return done(err);
                }

                if(!user){
                    console.log('User Not Found with username '+username);
                    return done(null, false);                 }
                if(!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false); // redirect back to login page
                }
                console.log('sucessfully logged in Admin '+ username);
                return done(null, user);
            });            
        }
    ));

 
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};