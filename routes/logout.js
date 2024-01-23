var express = require('express');
var router = express.Router();

const logoutController = require('../controllers/logoutController');

/* GET request to register new user */
router.get('/', logoutController.logout_get);

module.exports = router;
