//Require dependencies
var mongoose = require('mongoose');

//client schema
var ClientSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String,
    username: {type: String, unique: true},
    fullName: String,
    address: String,
    profile_pic: {type: String, default: "noimage.svg"},
    phone_number: String,
    liked: [{ business_names: String }],
    businesses_ratings: [{ business_name: String, business_rating: Number }],// not sure to do with this
    services_ratings: [{ service_name: String, service_Rating: Number }],// not sure to do with this
    ban: {type: Boolean , default : false}    //Whether the clients has been banned by an admin or not
});

//Export Schema
var Client = module.exports = mongoose.model('clients', ClientSchema);
