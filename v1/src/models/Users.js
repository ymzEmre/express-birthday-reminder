const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    profile_image: String,
    reminder_day: Number,
    reminder_type: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('user', UserSchema);
