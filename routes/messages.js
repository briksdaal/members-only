var express = require('express');
var router = express.Router();

const messageController = require('../controllers/messageController');

// GET request for list of all messages
router.get('/', messageController.message_list);

// GET request for creating a new message
router.get('/create', messageController.message_create_get);

// POST request for creating a new message
router.post('/create', messageController.message_create_post);

// GET request for list of all messages
router.get('/:id', messageController.message_list);

/* GET request to delete message */
router.get('/:id/delete', messageController.message_delete_get);

/* POST request to delete message */
router.post('/:id/delete', messageController.message_delete_post);

module.exports = router;
