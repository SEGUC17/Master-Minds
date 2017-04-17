
var Business= require('../../models/businessOwners.js');

/*
exports.deleteowner= function(req,res){
  Business.findOne({business_name:'breakout'}, function(err, business){
    business.remove({business_name:'breakout'});

    business.save();
    })
  res.render('homepageView');
}

*/



exports.deleteOwner= function(req,res){
 var bussinessname=req.body.bname
  Business.findOne({business_name:req.param('business_name')}, function(err, business){
    business.remove({business_name:bussinesname});

    business.save();
    })
  res.render('homepageView');

}
