//Require dependencies
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var passport = require('passport');
//var authenticate = require('./routes/authenticate')(passport);
var mongoose = require('mongoose');
var DB_URI = "mongodb://localhost:27017/BreakOut";
var app = express();

//Configure app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI);
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./passport-init');
initPassport(passport);
app.use(router);


//Start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
})

