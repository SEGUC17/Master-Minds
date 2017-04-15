//Require dependencies
var businesses = require('../../../models/businessOwners');

let businessLoginController = {

    login: function (req, res) {
        var personal_email = req.body.personal_email;
        var password = req.body.password;
        if (personal_email == "" || personal_email == null) {
            res.send("you must enter  your personal email to login ");
            // res.render('businessowner_login');//login view page in front end
        } else {
            if (password == "" || password == null) {
                res.send("you must enter  your password for your  email to login ");
                // res.render('businessowner_login');//login view page in front end
            } else {
                businesses.findOne({ personal_email: personal_email }, function (err, userlogin) {
                    if (err) {
                        // if no email mathes error appears
                        res.send("error happened while login no  personal email matches businessOwner please check your email again");
                        //  res.render('businessowner_login'); // login view page in front end
                        //  res.send(err);
                    } else {
                        // chechking the password to match the password in database for this email
                        if (userlogin.validPassword(password)) {
                            res.send("password matches   personal email password ");
                            //   res.redirect('/businessowner_logged');// logged  page view in the front end
                            session.username = req.body.personal_email;
                        } else {
                            res.send("password does not matches    personal email password please try again ");
                            //  res.render('businessowner_login'); // login in view page in front end
                        }
                    }
                });
            }
        }
    }

}

//Export Controller
module.exports = businessLoginController;