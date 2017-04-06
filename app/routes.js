// require dependincies 
var express = require('express');
var router = express.Router();
var homepageController = require('./controllers/hompageController');

// add routes
router.get('/', homepageController.test);

// export router

module.exports = router;