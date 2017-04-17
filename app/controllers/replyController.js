var Business= require('../../models/businessOwners.js');

exports.Post_Reply= function(req,res){
 var business = new Business();
//  business.personal_email = 'g@gmail.com';
  //business.business_name = 'breakout';
//  business.business_reviews.push({review: 'good'});
// business.save();
Business.findOne({business_name:'breakout',personal_email:'g@gmail.com'}, function(err, business){
  business.business_reviews.push({review:'bad'});
  business.save();
  res.console.log(200);
res.status(200).send('Reply Successfully Posted');
  })
res.render('homepageView');

}








// exports.Post_Reply= function(req,res){
//  var business = new Business();
//   business.personal_email = 'g@gamil.com';
//   business.business_name = 'breakout';
// // business.business_reviews.push({review: 'bad'});
//  business.save();
// var reply=req.body.reply;
// Business.findOne({business_name: req.user.business_name,personal_email:req.user.personal_email}, function(err, business){
//   business.business_reviews.push({review:reply});
//   business.save();
//   })
// res.render('homepageView');
//
// }
