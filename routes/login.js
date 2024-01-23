var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');

/* GET request to log in user */
router.get('/', loginController.login_get);

/* POST request to log in user */
router.post('/', loginController.login_post);

module.exports = router;
