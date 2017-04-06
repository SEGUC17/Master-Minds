//Require dependencies
var mongoose = require('mongoose');

//Admin schema
var AdvertisementSchema = mongoose.Schema({
    business_name: String,
    service_name: String,
    date: Date
});

//Export schema
var Advertisement = module.exports = mongoose.model('advertisements', AdvertisementSchema);