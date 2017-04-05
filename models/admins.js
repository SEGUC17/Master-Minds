//Require dependencies
var mongoose = require('mongoose');

//Admin schema
var AdminSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

//Export schema
mongoose.model('admins', AdminSchema);

//var Admin = module.exports = 