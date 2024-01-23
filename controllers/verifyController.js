const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();

/* Display new user verify form on GET */
exports.verify_get = asyncHandler((req, res, next) => {
  res.render('verify-form');
});

/* Handle new user verify on POST */
exports.verify_post = [
  body('secret').trim().escape(),
  asyncHandler(async (req, res, next) => {
    if (req.body.secret !== process.env.secret) {
      return res.render('verify-form', { error: "That's not the secret..." });
    }

    const user = await User.findById(req.user);

    await User.findByIdAndUpdate(req.user, {
      membershipStatus: 'Verified',
    });

    res.redirect('/');
  }),
];
