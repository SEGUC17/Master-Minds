//Require dependencies
var fs = require('fs');

let Clients = require('../../models/clients');

let profileController = {

    viewProfile: function (req, res) {
        if (!req.user) {
            res.status(401).send('GET OFF MY PROPERTY');
        } else {
            var user = req.user.username;
            Clients.findOne({ username: user }, function (err, user) {
                if (err) {
                    res.status().send(err);
                } else {
                    if (user) {
                        res.send(user);
                    }
                    else {
                        res.status(404).send('User not found');
                    }
                }
            });
        }
    },

    getEditProfile: function (req, res) {
        res.render('edituserprofile');
    },

    editProfile: function (req, res) {
        if (!req.user) {
            res.status(401).send('GET OFF MY LAWN!!!!')
        }
        else {
            var username = req.user.username;
            var password = req.body.password;
            var email = req.body.email;
            var address = req.body.address;
            var profile_pic = req.file.filename;
            var phone_number = req.body.phone_number;
            var fullname = req.body.fullname;

            Clients.findOne({ 'username': username }, function (err, user) {
                if (err) {
                    console.log(err);
                    res.status(404).send('Could not find the user');
                } else {
                    if (user) {
                        if (req.file) {
                            if (user.profile_pic)
                                fs.unlink('./public/client/' + user.profile_pic);
                        }
                        user.password = password;
                        user.email = email;
                        user.address = address;
                        user.profile_pic = profile_pic;
                        user.phone_number = phone_number;
                        user.fullName = fullname;
                        user.save(function (err, editUser) {
                            if (err) {
                                console.log(err);
                                res.status(400).send('There was critical missing data');
                            } else {
                                res.send(editUser);
                            }
                        });
                    } else {
                        res.status(404).send('user not found');
                    }
                }
            });
        }
    }

}

//Export Controller
module.exports = profileController;