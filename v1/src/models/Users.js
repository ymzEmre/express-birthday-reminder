const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    reminder_value: { type: String, default: 3 },
    reminder_type: { type: String, default: 'Day' },
    reminder_status: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('user', UserSchema);
