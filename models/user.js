const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  membershipStatus: {
    type: String,
    enum: ['Verified', 'Unverified'],
    default: 'Unverified',
  },
});

UserSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastname}`;
});

UserSchema.virtual('isMember').get(function () {
  return this.membershipStatus === 'Verified';
});

module.exports = mongoose.model('User', UserSchema);
