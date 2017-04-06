//Require dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Business owner Schema
var BusinessSchema = mongoose.Schema({
    personal_email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: String,
    fullname: String,
    business_name: { type: String, required: true, unique: true },
    business_description: String,
//<<<<<<< HEAD
    business_emails: [{ email: String, description: String }],  //Business emails with description each
    business_logo: { data: Buffer, contentType: String },
    associated_bank : String,   //The bank the business deals with
    business_website : String,
    FAQ : String,
    business_reviews : [{username: String, review : String, reported : {type: Number, default: 0}}],   //Array of reviews and reports
    business_rating : [{rating : Number}],
    accepted: Boolean,
//=======

  //  business_emails: [{ email: String }],
  //  business_logo: String,
    //associated_bank: String, //The bank the business deals with
    //business_website: String,
    //FAQ: String,
    //business_reviews: [{ review: String, reported: { type: Number, default: 0 } }], //Array of reviews and reports
    //business_rating: [{ rating: Number }],
    //accepted: Boolean, // whether or not the business's application to the directory has been accepted by the admin

//>>>>>>> aa5aa91d3e7e2db03be8e7163c7c81e0467c9922

    //Business Services
    services: [{
        service_pic: { data: Buffer, contentType: String },
        service_name: String,
        service_Description: String,
        service_price: Number,
//<<<<<<< HEAD
        promotion_offer : Number,   //Percentage dicount on service
        service_rating : [{rating : Number}],   //Array of ratings to get average
        service_reviews : [{review : String, reported : {type: Number, default: 0}}],   //Array of reviews and corresponding reported number
        type_flag : Boolean,    //Whether sevice type is time-based (true) or product-based (false)
        available_flag : Boolean,    //Whether service is available or not
    }]
//=======

      //  promotion_offer: Number, //Percentage dicount on service
        //service_rating: [{ rating: Number }], //Array of ratings to get average
      //  service_reviews: [{ review: String, reported: { type: Number, default: 0 } }], //Array of reviews and corresponding reported number
      //  type_flag: Boolean, //Whether sevice type is time-based (true) or product-based (false)
        //available_flag: Boolean, //Whether service is available or not
  //  }]

//>>>>>>> aa5aa91d3e7e2db03be8e7163c7c81e0467c9922
});

BusinessSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

BusinessSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
//Export Schema
var Business = module.exports = mongoose.model('businesses', BusinessSchema);
