var Admin = require('../../models/admins');
let businesses = require('../../models/businessOwners');

let view_unaccepted_businesses = {

    view_unaccepted: function(req, res) {
        if(req.isAuthenticated()){
        if (req.user.admin){
        businesses.find({ accepted: false }, function(err, unaccepted) {
            res.json({"result":"success","content":unaccepted});
        });
        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
            res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }
    },

    accept_application: function(req, res) {
        //console.log("accept_application was called!");
        if(req.isAuthenticated()){
            //console.log("isAuthenticated!");
        if (req.user.admin){
            //console.log("req.user.admin!");
        businesses.findOne({ business_name: req.param('business') }, function(err, business) {
            //console.log(business);
            business.accepted = true;
            business.save(function(err, business){
                if(err){
                    res.json({"result": "failure","message":"Error in saving accepted business in database!"});
                }else{
                    res.json({"result": "success"}); //Confirm success by returning JSON object with result field set to "Success".
                }
            });
        });
        }else{
            res.json({"result": "failure","message":"You are not an admin!"}); //Indicates failure if not admin.
        }

        }else{
            res.json({"result": "failure","message":"You are not logged in!"}); //Indicates failure if not admin.
        }

    }

}

//Export Controller
module.exports = view_unaccepted_businesses;