const User = require("../models/User");

const getAllJobs = (req, res) => {
  res.json({ msg: "get all job route" });
};
const getJob = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = await User.findByIdAndUpdate(id, {
    name,
    email,
    password,
  });

  res.json({ success: true, user });
};
const createJob = async (req, res) => {
  const { id } = req.params;
  res.json({ msg: `route ${id}` });
};
const updateJob = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = await User.findByIdAndUpdate(id, {
    name,
    email,
    password,
  });

  res.json({ success: true, user });
};
const deleteJob = async (req, res) => {
  const { id } = req.params;
  
  const user = await User.findByIdAndDelete(id);
  res.json({ success: true, msg: "Job deleted!",user });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
