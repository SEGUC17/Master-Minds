var mongoose = require('mongoose');

// Business Owner Schema
var BusinessSchema = mongoose.Schema({
    personal_email: { type: String, required: true, unique: true },
    password: String,
    address: String,
    fullname: String,
    Business_Description: String,
    Business_emails: [{ email: String, Description: String }],
    Business_name: { type: String, required: true, unique: true },
    Business_logo: img, // we need to look into this 
    Services: [{ Service_pic: img,
         Service_name: String, 
         Service_Description: String, 
         Service_price: Number, 
         offer : Numer , // can't read it well from the paper
         Time_flag : Boolean , 
         Available_flag : Boolean , 
         Service_rate : Number ,
         Service_reviews : [{Review : String}] ,
         choices : String // can't read the word above it in the paper
          }] ,
    Associated_Bank : String ,
    Business_website : String ,
    FAQ : String ,
    Business_reviews_and_reports : [{Review : String , Report : String}],
    Business_rate : Number
});

var Business = module.exports = mongoose.model('Business', BusinessSchema);
