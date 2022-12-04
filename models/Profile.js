const mongoose = require("mongoose");

const profile = mongoose.Schema({
  url: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  D0B: {
    type: String,
  },
  phoneno: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model("profile_data", profile);
module.exports = Profile;
