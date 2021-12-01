const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
    // match: [
    //   /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    //   "Please provide a valid email.",
    // ],
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.methods.matchPasswords = async (password) => {
  return await (password === this.password);
};

userSchema.methods.getSomeToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
