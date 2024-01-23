const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/message');
const { authGuard, adminGuard } = require('../routes/middleware/guards');

exports.message_list = asyncHandler((req, res, next) => {
  res.redirect('/');
});

exports.message_create_get = [
  authGuard,
  asyncHandler((req, res, next) => {
    res.render('message-form');
  }),
];

exports.message_create_post = [
  authGuard,
  body('title', 'Title must not be empty').trim().isLength({ min: 1 }).escape(),
  body('content', 'Content must not be empty or over 200 characters')
    .trim()
    .isLength({ min: 1, max: 400 })
    .escape(),
  asyncHandler((req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const messageForRerender = {
        title: req.body.title,
        content: req.body.content,
      };

      return res.render('message-form', {
        messageForRerender,
        errors: errors.array(),
      });
    }

    next();
  }),
  asyncHandler(async (req, res, next) => {
    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      by: req.user._id,
    });

    await message.save();

    res.redirect('/');
  }),
];

exports.message_delete_get = [
  adminGuard,
  asyncHandler((req, res, next) => {
    res.send('message_delete_get');
  }),
];

exports.message_delete_post = [
  adminGuard,
  asyncHandler((req, res, next) => {
    res.send('message_delete_post');
  }),
];
