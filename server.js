//Require dependencies
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var passport = require('passport');

var expressValidator = require('express-validator');
var flash = require('connect-flash');

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
//var initPassport = require('./passport-init');
//initPassport(passport);



app.use(router);

// Express Validator
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

// Connect Flash
app.use(flash());

// Global Vars for flashing
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//Start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
})
