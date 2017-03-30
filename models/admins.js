var mongoose = require('mongoose');

// Admin Schema
var AdminSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);
