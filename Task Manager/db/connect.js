const mongoose = require("mongoose");


module.exports = function connectDb(uri) {
  return mongoose.connect(uri)
};