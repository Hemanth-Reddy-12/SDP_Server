const jwt = require("jsonwebtoken");
const Register = require("../models/Register");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.cookies;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);

    const user = await Register.findOne({ _id: verifyUser.id });
    console.log(user.username);

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
