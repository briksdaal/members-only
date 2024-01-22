const asyncHandler = require('express-async-handler');

exports.index = asyncHandler((req, res, next) => {
  res.render('index', { title: 'test' });
});
