const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
require('dotenv').config();

/* Display user verify form on GET */
exports.verify_get = asyncHandler((req, res, next) => {
  res.render('verify-form', { title: 'Verify Membership' });
});

/* Handle user verify on POST */
exports.verify_post = [
  body('secret').trim().escape(),
  asyncHandler(async (req, res, next) => {
    if (req.body.secret !== process.env.CLUB_SECRET) {
      return res.render('verify-form', {
        title: 'Verify Membership',
        errors: [{ msg: "That's not the secret..." }],
      });
    }

    const user = await User.findById(req.user._id).exec();

    await User.findByIdAndUpdate(req.user, {
      membershipStatus: 'Verified',
    }).exec();

    res.redirect('/');
  }),
];
