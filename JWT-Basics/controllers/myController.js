require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomApiError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomApiError(
      "both username and password must be provided!",
      StatusCodes.BAD_REQUEST
    );
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.json({ msg: `User for ${username} succesfully created!`, token });
};

const dashboard = (req, res) => {
  const randomNum = Math.floor(Math.random() * 100);
  res.json({
    msg: `Hey ${req.user.toUpperCase()}!`,
    data: `Your lucky number is ${randomNum}`,
  });
};

module.exports = { login, dashboard };
