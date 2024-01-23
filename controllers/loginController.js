const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');

/* Dispaly login form on GET */
exports.login_get = asyncHandler((req, res, next) => {
  res.render('login-form');
});

/* Handle login attempt on POST */
exports.login_post = [
  body('email', 'Email must not be empty').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const userForRerender = {
        email: req.body.email,
      };

      return res.render('login-form', {
        userForRerender,
        errors: errors.array(),
      });
    }

    res.send('logged in');
  }),
];

/* Display new user verify form on GET */
exports.verify_get = asyncHandler((req, res, next) => {
  res.send('Verify get');
});

/* Handle new user verify on POST */
exports.verify_post = asyncHandler((req, res, next) => {
  res.send('Verify post');
});
