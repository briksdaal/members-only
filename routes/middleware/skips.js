const asyncHandler = require('express-async-handler');

exports.skipIfLoggedIn = asyncHandler((req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
  next();
});

exports.skipIfVerified = asyncHandler((req, res, next) => {
  if (req.user.membershipStatus === 'Verified') {
    res.redirect('/');
  }
  next();
});

exports.skipIfAdmin = asyncHandler((req, res, next) => {
  if (req.user.admin) {
    res.redirect('/');
  }
  next();
});
