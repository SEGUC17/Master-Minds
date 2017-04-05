var Business= require('../Models/businessOwners.js');


exports.Post_Reply= function(req,res){
 var business = require('mongoose').model('businesses');
  if(err)
           {
             console.log(401);
             res.status(401).send('ERROR');
}
else {
  var reply={
    "reply":req.body.reply
  }
  { $push: {business_reviews_and_reports.reply:reply } }
  business.save();
                  res.console.log(200);
  res.status(200).send('Reply Successfully Posted');
}
}
