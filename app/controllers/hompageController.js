let admins = require('../../models/admins');
let businessOwners = require('../../models/businessOwners');
let clients = require('../../models/clients');

let homepageController = {
    
    test:function(req, res){
        // var admin = new admins();
        // admin.username = "genedy";
        // admin.password = "genedy";
        // admin.email = "genedymohamed96@gmail.com";
        // admin.save();
        console.log('success');
        },

    createPortofolio:function(req, res){
        if (session.username){
        var x = new Portofolios();
        var y = new Works();
        x.student_username = req.body.name;
        x.Title = req.body.title;
        x.profilePicture = req.body.pp;
        x.works = req.body.w;
        y.student_username = req.body.name;
        y.screenshots = req.body.ss;
        y.links = req.body.w;
        y.repos = req.body.r;
        x.save();
        y.save();
        res.redirect('/');
        }else{
            res.send("YOU ARE NOT AUTHORIZED. sorry")
        }
    }
}

module.exports = homepageController;