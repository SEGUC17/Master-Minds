//Require dependencies
var mongoose = require('mongoose');

//Business owner Schema
var servicesSchema = mongoose.Schema({

        service_pic: { data: Buffer, contentType: String },
        service_name: String,
        service_Description: String,
        service_price: Number,
        promotion_offer : Number,   //Percentage dicount on service
        service_rating : [{rating : Number}],   //Array of ratings to get average
        service_reviews : [{review : String}],   //Array of reviews
        type_flag : Boolean,    //Whether sevice type is time-based (true) or product-based (false)
        available_flag : Boolean    //Whether service is available or not

});

//Export Schema
var services = module.exports = mongoose.model('services', servicesSchema);
