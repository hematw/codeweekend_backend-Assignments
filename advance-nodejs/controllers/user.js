const User = require("../models/User");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    console.log("req user register", req.user);
    return res.redirect("/secret");
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
};

module.exports = createUser;
