var mongoose = require('mongoose');

//client schema
var ClientSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String,
    username: String,
    fullName: String,
    address: String,
    profile_pic: img, //we should look into this
    phone_number: String,
    ban: Boolean,
    liked: [{ Business_names: String }],
    Businesses_ratings: [{ Business_name: String, Business_Rating: Number }],
    Services_ratings: [{ Service_name: String, Service_Rating: Number }]
});

var Client = module.exports = mongoose.model('Client', ClientSchema);
