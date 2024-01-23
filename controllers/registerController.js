const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

/* Dispaly new user register form on GET */
exports.register_get = asyncHandler((req, res, next) => {
  res.render('register-form');
});

/* Handle new user create on POST */
exports.register_post = [
  body('firstname', 'First name must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastname', 'Last name must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Email must not be empty')
    .custom(async (val) => {
      const userExists = await User.findOne({ email: val }).exec();
      if (userExists) {
        throw new Error('User with email already exists');
      }
    })
    .escape(),
  body('password', 'Password must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('confirm-password', "Passwords don't match")
    .trim()
    .custom((val, { req }) => val === req.body.password)
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const userForRerender = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      };

      return res.render('register-form', {
        userForRerender,
        errors: errors.array(),
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    next();
  }),
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
    successRedirect: '/verify',
  }),
];
