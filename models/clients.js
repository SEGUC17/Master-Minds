//Require dependencies
var mongoose = require('mongoose');

//client schema
var ClientSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String,
    username: String,
    fullName: String,
    address: String,
    profile_pic: { data: Buffer, contentType: String },
    phone_number: String,
    liked: [{ business_names: String }],
    businesses_ratings: [{ business_name: String, business_rating: Number }],
    services_ratings: [{ service_name: String, service_Rating: Number }],
    ban: Boolean    //Whether the clients has been banned by an admin or not
});

//Export Schema
var Client = module.exports = mongoose.model('clients', ClientSchema);