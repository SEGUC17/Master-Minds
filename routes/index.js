var express = require('express');
var router = express.Router();
var user = require('../models/user');

// Get Homepage

//router.get('/', user.getAllUsers);

router.get('/', function(req, res) {
    user.find(function(err, users) {
        if (err)
            res.send(err.message);
        else
            res.render('index', { users });
    })
});

/*router.post('/showdetails', function(req, res) {
    user.findOne({ email: req.body.email }, function(err, User) {
        if (err)
            res.send(err.message);
        else
            res.render('showdetails', { name: req.body.name }, { email: req.body.email }, { projects: User.works });
    })
});*/

/*router.get('/', ensureAuthenticated, function(req, res) {
    res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}*/

module.exports = router;