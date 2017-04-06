//Require dependencies
var mongoose = require('mongoose');

//Admin schema
var AdminSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

//Export schema
var Admin = module.exports = mongoose.model('admins', AdminSchema);