const express = require("express");
const mongoose = require("mongoose");
const Register = require("./models/Register");
const Profile = require("./models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
require("dotenv/config");

const app = express();
app.use(express.json());

mongoose.connect(process.env.URL, () => console.log("Connected to Database"));
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/display", async (req, res) => {
  Profile.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});

// * server request for the regester FormData

app.post("/register", async (req, res) => {
  try {
    const _username = req.body.username;
    const _fullname = req.body.fullname;
    const _email = req.body.email;
    const _password = req.body.password;
    const register = new Register({
      username: _username,
      fullname: _fullname,
      email: _email,
      password: _password,
    });
    const _token = await register.generateAuthToken();
    const registered = await register.save();

    res.cookie("cookie", _token);
    res.send("Inserted Values");
  } catch (err) {
    console.log(err);
  }
});

// * server request for login

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userdetails = await Register.findOne({ email: email });

    if (!userdetails) {
      return res.json({
        error: "user not found",
      });
    }

    if ((await userdetails.password) == password) {
      const token = jwt.sign({}, process.env.SECRET_KEY);
      if (res.status(201)) {
        return res.json({ status: "ok", token: token, details: userdetails });
      } else {
        res.send("invalid password Details");
      }
    }
  } catch (error) {
    return res.json({ status: "error", error: "Invalid password" });
  }
});

app.get("/logout", auth, function (req, res) {
  try {
    res.clearCookie("cookie");
    console.log("logout success");
    req.user.save();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(9996, () => console.log("server start"));
