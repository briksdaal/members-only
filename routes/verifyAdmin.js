var express = require('express');
var router = express.Router();

const verifyAdminController = require('../controllers/verifyAdminController');
const authGuard = require('./middleware/guards').authGuard;
const skipIfAdmin = require('./middleware/skips').skipIfAdmin;

/* Guard against unauthenticated visitors */
router.use(authGuard);

/* Skip and redirect to homepage if already admin */
router.use(skipIfAdmin);

/* GET request to verify user as admin */
router.get('/', verifyAdminController.verify_admin_get);

/* POST request to verify user as admin */
router.post('/', verifyAdminController.verify_admin_post);

module.exports = router;
