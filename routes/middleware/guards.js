const asyncHandler = require('express-async-handler');

exports.authGuard = asyncHandler((req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
});

exports.adminGuard = asyncHandler((req, res, next) => {
  if (!req.isAuthenticated() || !req.user.admin) {
    return res.redirect('/');
  }
  next();
});
