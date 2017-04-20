var Admin = require('../../models/admins');
let businesses = require('../../models/businessOwners');

let view_unaccepted_businesses = {

    view_unaccepted: function(req, res) {
        businesses.find({ accepted: false }, function(err, unaccepted) {
            res.send(unaccepted);
        })
    },

    accept_application: function(req, res) {
        businesses.findOne({ business_name: req.param('business') }, function(err, business) {
            business.accepted = true;
        })

    }

}

//Export Controller
module.exports = view_unaccepted_businesses;