//Require dependencies
var fs = require('fs');

let clients = require('../../models/clients');
let session = require('express-session');

let homepageController = {
    
    //Testing image
    test:function(req, res){
        session.username = 'genedy';
        //Removing data in the collection clients
        clients.remove(function (err) {
            if (err) throw err;
        });
        var client = new clients(); //Creating a new instance of client
        client.email = 'genedymohamed96@gmail.com';
        client.profile_pic.data = fs.readFileSync('././public/genedy.jpg'); //Reading the image in binary
        client.profile_pic.contentType = 'image/jpg';   //Stating image type
        //Saving the client instance in the clients collection
        client.save(function (err, a) { 
            if (err) throw err;
            clients.findOne({email: 'genedymohamed96@gmail.com'}, function(err, client){
                res.contentType(client.profile_pic.contentType);    //Send to browser viewing type
                res.send(client.profile_pic.data);  //Sending to browser the image from the database
            })        
        });
    }
}

//Export Controller
module.exports = homepageController;