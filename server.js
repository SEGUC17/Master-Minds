//Require dependencies
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var fs=require('fs');
var DB_URI = "mongodb://localhost:27017/BreakOut";
var app = express();

//Configure app
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI,function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Connected to DB successfuly");
  }
});




app.use(router);

 //Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Connect Flash
app.use(flash());

//Start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
})
