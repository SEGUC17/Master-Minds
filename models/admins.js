var mongoose = require('mongoose');

// Admin Schema
var AdminSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    emails: [{ email: String, Description: String }],
});

var Admin = module.exports = mongoose.model('admins', AdminSchema);
