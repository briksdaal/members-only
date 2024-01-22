var express = require('express');
var router = express.Router();

const registerController = require('../controllers/registerController');

/* GET request to register new user */
router.get('/', registerController.register_get);

/* POST request to register new user */
router.post('/', registerController.register_post);

module.exports = router;
