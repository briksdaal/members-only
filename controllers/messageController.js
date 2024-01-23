const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/user');

exports.message_list = asyncHandler((req, res, next) => {
  res.redirect('/');
});

exports.message_create_get = [
  asyncHandler((req, res, next) => {
    res.send('message_create_get');
  }),
];

exports.message_create_post = [
  asyncHandler((req, res, next) => {
    res.send('message_create_post');
  }),
];

exports.message_delete_get = [
  asyncHandler((req, res, next) => {
    res.send('message_delete_get');
  }),
];

exports.message_delete_post = [
  asyncHandler((req, res, next) => {
    res.send('message_delete_post');
  }),
];
