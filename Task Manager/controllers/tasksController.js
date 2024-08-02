const Task = require("../models/Task");
const taskBody = require("../validators/taskValidator");

const getTask = async (req, res) => {
  const { id } = req.params.id;
  const task = await Task.findOne({ id });
  if (!task) {
    res.status(404).json({ msg: "Task not Found!" });
  }
  res.status(200).json({ task });
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  if (!tasks) {
    res.status(404).json({ msg: "Tasks not Found!" });
  }
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.validationResult.value);
  if (!task) {
    res.status(404).json({ msg: "Task not Found!" });
  }
  res.status(201).json({ msg: "Task created!", task });
};

const removeTask = async (req, res) => {
  const { id } = req.params.id;
  const task = await Task.deleteOne({ id });
  if (!task) {
    res.status(404).json({ msg: "Task not Found!" });
  }
  res.status(200).json({ msg: "Task deleted!", task });
};

const updateTask = async (req, res) => {
  const { id } = req.params.id;
  const task = await Task.updateOne({ id }, req.body);
  if (!task) {
    res.status(404).json({ msg: "Task not Found!" });
  }
  res.status(200).json({ msg: "Task updated" });
};

module.exports = { getTask, updateTask, removeTask, getAllTasks, createTask };
