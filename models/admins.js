//require dependencies
var mongoose = require('mongoose');

//Admin schema
var AdminSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    admin: {type:Boolean, default: true}
});

//Export schema
var Admin = module.exports = mongoose.model('admins', AdminSchema);
