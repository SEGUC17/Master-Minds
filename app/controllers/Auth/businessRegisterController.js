//Require dependencies
var businesses = require('../../../models/businessOwners');

let businessRegisterController = {

    register: function (req, res) {
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
            UserRegisterController.createUser(newClient, function (err, client) {
                if (err) throw err;
                console.log(client);
            });
            res.redirect('/login');
        }
    }

}

//Export Controller
module.exports = businessRegisterController;