const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
require('dotenv').config();

/* Display user verify as admin form on GET */
exports.verify_admin_get = asyncHandler((req, res, next) => {
  res.render('verify-admin-form');
});

/* Handle user verify as admin on POST */
exports.verify_admin_post = [
  body('secret').trim().escape(),
  asyncHandler(async (req, res, next) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) {
      return res.render('verify-admin-form', {
        errors: [{ msg: "That's not the admin secret..." }],
      });
    }

    const user = await User.findById(req.user._id).exec();

    await User.findByIdAndUpdate(req.user, {
      membershipStatus: 'Verified',
      admin: true,
    }).exec();

    res.redirect('/');
  }),
];
