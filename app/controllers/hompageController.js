//Require dependencies
var fs = require('fs');
let session = require('express-session');

let clients = require('../../models/clients');
let admins = require('../../models/admins');
let businesses = require('../../models/businessOwners');

let homepageController = {
    
    //Testing image
    test:function(req, res){
        //session.username = 'genedy';
        //Removing data in the collection clients
        //clients.remove(function (err) {
        //    if (err) throw err;
        //});
        //var client = new clients(); //Creating a new instance of client
        //client.username = 'genedy';
        //client.email = 'genedymohamed96@gmail.com';
        //client.password = 'testpass';
        //client.profile_pic.data = fs.readFileSync('././public/genedy.jpg'); //Reading the image in binary
        //client.profile_pic.contentType = 'image/jpg';   //Stating image type
        //Saving the client instance in the clients collection
        //client.save(function (err, a) { 
        //    if (err) throw err;
        //    clients.findOne({email: 'genedymohamed96@gmail.com'}, function(err, client){
                //res.contentType(client.profile_pic.contentType);    //Send to browser viewing type
               //res.send(client.profile_pic.data);  //Sending to browser the image from the database
        //    })        
        //});
        
        ////////////////////////////////////////////////////////////////////////
        
        //admins.remove(function (err) {
        //    if (err) throw err;
        //});

        var admin = new admins(); //Creating a new instance of admin
        admin.username = 'testadmin';
        admin.email = 'genedy96@gmail.com';
        admin.password = 'testpass';
        //Saving the client instance in the admins collection
        //admin.save(function (err, a) { 
        //    if (err) throw err;
        //    admins.findOne({email: 'genedy96@gmail.com'}, function(err, admin){
        //       //res.send(admin.username);  //Sending to browser the image from the database
        //    })        
        //});
        
        /////////////////////////////////////////////////////////////////////////
        
        //businesses.remove(function (err) {
        //    if (err) throw err;
        //});

        var bus = new businesses(); //Creating a new instance of admin
        bus.business_name = 'test-name';
        bus.personal_email = 'genedy@gmail.com';
        bus.password = 'testpass';
        //Saving the client instance in the admins collection
        //bus.save(function (err, a) { 
        //    if (err) throw err;
        //    businesses.findOne({business_name: 'test-name'}, function(err, bus){
        //        res.send(bus.business_name);  //Sending to browser the image from the database
        //    })        
        //});
        
    }
}

//Export Controller
module.exports = homepageController;