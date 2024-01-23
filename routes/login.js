var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');
const skipIfLoggedIn = require('./middleware/skips').skipIfLoggedIn;

/* Skip and redirect to homepage if already logged in */
router.use(skipIfLoggedIn);

/* GET request to log in user */
router.get('/', loginController.login_get);

/* POST request to log in user */
router.post('/', loginController.login_post);

module.exports = router;
