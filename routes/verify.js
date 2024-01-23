var express = require('express');
var router = express.Router();

const verifyController = require('../controllers/verifyController');
const authGuard = require('./middleware/guards').authGuard;
const skipIfVerified = require('./middleware/skips').skipIfVerified;

/* Guard against unauthenticated visitors */
router.use(authGuard);

/* Skip and redirect to homepage if already verified */
router.use(skipIfVerified);

/* GET request to verify user */
router.get('/', verifyController.verify_get);

/* POST request to verify user */
router.post('/', verifyController.verify_post);

module.exports = router;
