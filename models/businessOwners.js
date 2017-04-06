//Require dependencies
var mongoose = require('mongoose');

//Business owner Schema
var BusinessSchema = mongoose.Schema({
    personal_email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: String,
    fullname: String,
    business_name: { type: String, required: true, unique: true },
    business_description: String,
    business_emails: [{ email: String}],  //Business emails with description each
    business_logo: String,
    associated_bank : String,   //The bank the business deals with
    business_website : String,
    FAQ : String,
    business_reviews : [{username:String ,review : String , report : Number}],   //Array of reviews and reports
    business_rating : [{username:String ,rating : Number}],
    accepted: Boolean,
    //Business Services
    services: [{
        service_pic: String,
        service_name:String,
        service_Description: String,
        service_price: Number,
        promotion_offer : Number,   //Percentage dicount on service
        service_rating  : [{username:String,rating : Number}],   //Array of ratings to get average
        service_reviews : [{username:String,review : String,report : Number}],   //Array of reviews
        type_flag : Boolean,    //Whether sevice type is time-based (true) or product-based (false)
        available_flag : Boolean    //Whether service is available or not
    }]
});

BusinessSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

BusinessSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
//Export Schema
var Business = module.exports = mongoose.model('businesses', BusinessSchema);
