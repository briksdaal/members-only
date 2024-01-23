const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

exports.index = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find()
    .populate('by', 'firstname lastname')
    .exec();

  console.log(allMessages);

  res.render('index', { title: 'Messages', message_list: allMessages });
});
