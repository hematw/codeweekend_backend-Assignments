const mongoose = require("mongoose");

const connectDb = async () => {
  return mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDb;
