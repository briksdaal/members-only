var express = require('express');
var router = express.Router();

const verifyController = require('../controllers/verifyController');

/* GET request to verify new user */
router.get('/', verifyController.verify_get);

/* POST request to verify new user */
router.post('/', verifyController.verify_post);

module.exports = router;
