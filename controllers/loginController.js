const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

/* Dispaly login form on GET */
exports.login_get = asyncHandler((req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  console.log(req.user);
  const loginError = req.session.messages
    ? req.session.messages[req.session.messages.length - 1]
    : null;
  const errorArr = loginError ? [{ msg: loginError }] : null;

  res.render('login-form', {
    errors: errorArr,
  });
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
    next();
  }),
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
    successRedirect: '/',
  }),
];
