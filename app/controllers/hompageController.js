//Require dependencies
var fs = require('fs');
let clients = require('../../models/clients');
let session = require('express-session');

let homepageController = {

    //Testing image
    test:function(req, res){
        console.log(session.username);
        session.username = 'genedy';
        //Removing data in the collection clients
        // clients.remove(function (err) {
        //     if (err) throw err;
        // });
        // var client = new clients(); //Creating a new instance of client
        // client.email = 'genedymohamed96@gmail.com';
        // client.profile_pic.data = fs.readFileSync('././public/genedy.jpg'); //Reading the image in binary
        // client.profile_pic.contentType = 'image/jpg';   //Stating image type
        var data = fs.readFileSync('././public/genedy.jpg');
        var contentType = 'image/jpg';
        //Saving the client instance in the clients collection

        // client.save(function (err, a) {
            // if (err) throw err;
            // clients.findOne({email: 'genedymohamed96@gmail.com'}, function(err, client){
                res.contentType(contentType);    //Send to browser viewing type
                res.send(data);  //Sending to browser the image from the database
            // })

        // });
    }
}

//Export Controller
module.exports = homepageController;
























// //Require dependencies
// var fs = require('fs');
// let session = require('express-session');
// let clients = require('../../models/clients');
// let admins = require('../../models/admins');
// let businesses = require('../../models/businessOwners');
// var bcrypt = require('bcryptjs');

// let homepageController = {

//     //Testing image
//     test:function(req, res){
//         //session.username = 'genedy';
//         //Removing data in the collection clients
//         clients.remove(function (err) {
//             if (err) throw err;
//         });
//         var client = new clients(); //Creating a new instance of client
//         client.username = 'genedy';
//         client.email = 'genedymohamed96@gmail.com';
//         client.password = 'testpass';
//         //client.profile_pic.data = fs.readFileSync('././public/genedy.jpg'); //Reading the image in binary
//         //client.profile_pic.contentType = 'image/jpg';   //Stating image type
//         //Saving the client instance in the clients collection
//         client.save(function (err, a) { 
//             if (err) throw err;
//             clients.findOne({email: 'genedymohamed96@gmail.com'}, function(err, client){
//                 //res.contentType(client.profile_pic.contentType);    //Send to browser viewing type
//                //res.send(client.profile_pic.data);  //Sending to browser the image from the database
//             })        
//         });
        
//         ////////////////////////////////////////////////////////////////////////
//         /*
//         admins.remove(function (err) {
//             if (err) throw err;
//         });

//         var admin_user = new admins(); //Creating a new instance of admin
//         admin_user.username = 'testadmin';
//         admin_user.email = 'test@gmail.com';
//         admin_user.password = 'testpass';
//         bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(admin_user.password, salt, function(err, hash) {
//             admin_user.password = hash;
//             admin_user.admin = true;
//             console.log(admin_user.password);
//                 admin_user.save(function (err, a) { 
//                 if (err) throw err;
//                 admins.findOne({email: 'test@gmail.com'}, function(err, admin_user){
//                 res.send(admin_user.username);  //Sending to browser the image from the database
//                 console.log(admin_user);
//                 });
//                 admins.update(
//                     {username: 'test'}, 
//                     {admin : true },
//                     {multi:true}, 
//                     function(err, numberAffected){  
//                     });        
//             });

//             console.log(hash);
//         });
//         });
//         */
//         //Saving the client instance in the admins collection
        
        
//         /////////////////////////////////////////////////////////////////////////
        
//         //businesses.remove(function (err) {
//         //    if (err) throw err;
//         //});

//         var bus = new businesses(); //Creating a new instance of admin
//         bus.business_name = 'test-name';
//         bus.personal_email = 'genedy@gmail.com';
//         bus.password = 'testpass';
//         //Saving the client instance in the admins collection
//         //bus.save(function (err, a) { 
//         //    if (err) throw err;
//         //    businesses.findOne({business_name: 'test-name'}, function(err, bus){
//         //        res.send(bus.business_name);  //Sending to browser the image from the database
//         //    })        
//         //});
//     }
// }

// //Export Controller
// module.exports = homepageController;
