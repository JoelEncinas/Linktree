const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  link: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  links: {
    type: mongoose.Schema.Types.Mixed,
  },
});

// change to user on project finish
module.exports = mongoose.model("User", userSchema);
