var express = require('express');
var router = express.Router();

module.exports = function(passport){

    //sends successful login state back to angular
    router.get('/success', function(req, res){
        //res.send({state: 'success', user: req.user ? req.user : null});

            res.redirect('/?success');

    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res){
        res.redirect('/login?failed');
        //res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });
/*
    router.get('/reg-failure', function(req, res){
        res.redirect('/register?failed');
        //res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });
*/
    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));
/*
    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/reg-failure'
    }));
*/
    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;

}
