const mongoose = require("mongoose");

const Task = new mongoose.Schema(
  {
    name: {
      type: String,
    //   allowNull: false,
    //   required: true,
    },
    completed: {
      type: Boolean,
    //   default: false,
    //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", Task);
