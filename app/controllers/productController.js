//Require dependencies
let businesses = require('../../models/businessOwners');

let productContoller = {
    reportReview: function (req, res) {
        /*
        I will get a post request from the detailed product view when the button of the report on 
        a certain review is clicked. The product name, the business name and the review content 
        will be passed from the view to this function in the product controller. 
        This function should search for the review in the business and set the reported flag true.
        */
        console.log(req.param('report'));
        if (req.param('report') == 'true') {
            var business = new businesses();
            business.personal_email = 'genedymohamed96@gmail.com';
            business.business_name = 'breakout';
            business.services.service_name = 'room';
            business.services.service_reviews={"review":"hello", "reported":0};
            business.save();
            console.log(req.param('businessname'));
            console.log(req.param('product'));
            console.log(req.param('report'));
            console.log(req.body.review);
            console.log(business.services.service_reviews.review)
            businesses.findOne({ 'business_name': req.param('businessname') }, function (err, business) {
                business.findOne({ 'service.service_name': req.param('product') }, function (err, service) {
                    service.findOne({ 'service_reviews.review': req.body.review }, function (err, review) {
                        review.reported += 1;
                    })
                })
            })
        }
        res.render('detailedProductView');
    },
    advertisment: function (req, res) {
        //I will get a post request from the view 
    }
}

//Export controller
module.exports = productContoller;