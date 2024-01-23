const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

MessageSchema.virtual('deleteurl').get(function () {
  return `/messages/${this._id}/delete`;
});

MessageSchema.virtual('ddmmyy_dateBought').get(function () {
  return this.createdAt
    ? DateTime.fromJSDate(this.createdAt).toFormat("dd'/'MM'/'yy")
    : '';
});

module.exports = mongoose.model('Message', MessageSchema);
