const express = require("express");
let { instructors, courses, students } = require("../data");
const filter = require("../filter");

const coursesRouter = express.Router();

coursesRouter.get("/", (req, res) => {
  let filteredCourses = courses;
  for (let prop in req.query) {
    try {
      filteredCourses = filter(
        filteredCourses,
        prop,
        req.query[prop].split(",")
      );
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  res.status(200).json({ courses: filteredCourses });
});

coursesRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const course = courses.find((course) => course.course_id == id);

  if (course) {
    return res.status(200).json({ course });
  }
  return res.status(404).json({ message: `invalid course id ${id}` });
});

coursesRouter.get("/:id/instructors", (req, res) => {
  const { id } = req.params;
  const course = courses.find((course) => course.course_id == id);

  if (course) {
    const courseInstructors = instructors.filter((ins) =>
      course.instructors.includes(ins.name)
    );
    return res.status(200).json({ instructors: courseInstructors });
  }
  return res.status(404).json({ message: `invalid course id ${id}` });
});

coursesRouter.get("/:id/students", (req, res) => {
  const { id } = req.params;
  const course = courses.find((course) => course.course_id == id);

  if (course) {
    const courseStudents = students.filter((student) =>
      student.courses.includes(course.course_name)
    );
    return res.status(200).json({ students: courseStudents });
  }
  return res.status(404).json({ message: `invalid course id ${id}` });
});

coursesRouter.post("/", (req, res) => {
  const lastCourseId = courses[courses.length - 1].course_id;
  const newCourse = {
    ...req.body,
    course_id: lastCourseId + 1,
  };
  courses.push(newCourse);
  res.status(201).json({ newCourse });
});

coursesRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  let courseIndex;
  const course = courses.find((c, index) => {
    if (c.course_id == id) {
      courseIndex = index;
      return true;
    }
  });
  if (!course) {
    return res
      .status(404)
      .json({ message: `Course with id(${id}) Not found!` });
  }
  const updatedCourse = {
    ...course,
    ...req.body,
  };
  courses[courseIndex] = updatedCourse;
  res.status(200).json({ updatedCourse });
});

coursesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const course = courses.find((c) => c.course_id == id);
  console.log(course);
  if (!course) {
    return res
      .status(404)
      .json({ message: `Course with id(${id}) Not found!` });
  }
  courses = courses.filter((c) => c.course_id != id);
  res.status(200).json({ course });
});

module.exports = coursesRouter;