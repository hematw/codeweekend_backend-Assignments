const { Router } = require("express");
const router = new Router();
const {
  getTask,
  getAllTasks,
  updateTask,
  removeTask,
  createTask,
} = require("../controllers/tasksController");
const taskValidator = require("../validators/taskValidator");



router.route("/").get(getAllTasks).post(taskValidator, createTask);
router.route("/:id").get(getTask).put(taskValidator, updateTask).delete(removeTask);
module.exports = router;
