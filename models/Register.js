const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const register = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

register.methods.generateAuthToken = async function () {
  try {
    const _token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.token = _token;
    await this.save();
  } catch (error) {
    console.log("the error part" + error);
  }
};

const Register = mongoose.model("Users_Data", register);
module.exports = Register;
