const User = require("../models/User");
const UnauthorizedError = require("../errors/unauthorized-error")

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    throw new UnauthorizedError("Wrong credentails!");
  }
  res
    .status(200)
    .json({ success: true, message: "User login successfully! ", user });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res
    .status(200)
    .json({ success: true, message: "User registered successfully! ", user });
};

module.exports = { login, register };
