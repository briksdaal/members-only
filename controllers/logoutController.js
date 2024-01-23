const asyncHandler = require('express-async-handler');

/* Handle logout on GET */
exports.logout_get = asyncHandler((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
