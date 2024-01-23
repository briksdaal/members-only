const asyncHandler = require('express-async-handler');

exports.skipIfVerified = asyncHandler((req, res, next) => {
  if (req.user.membershipStatus === 'Verified') {
    res.redirect('/');
  }
  next();
});
