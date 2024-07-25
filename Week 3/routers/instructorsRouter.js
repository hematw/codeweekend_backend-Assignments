const express = require("express");
let { instructors, courses } = require("../data");
const filter = require("../filter");

const instructorsRouter = express.Router();

instructorsRouter.get("/", (req, res) => {
  let filteredInstructors = instructors;
  for (let prop in req.query) {
    try {
      filteredInstructors = filter(
        filteredInstructors,
        prop,
        req.query[prop].split(",")
      );
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  res.status(200).json({ instructors: filteredInstructors });
});

instructorsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const instructor = instructors.find((inst) => inst.instructor_id == id);

  if (instructor) {
    res.status(200).json({ instructor: instructor });
  } else {
    res.status(404).json({ message: `instructor with id(${id}) not found` });
  }
});

instructorsRouter.get("/:id/courses", (req, res) => {
  const id = req.params.id;
  const instructor = instructors.find((inst) => inst.instructor_id == id);
  if (instructor) {
    const existingCourses = courses.filter((course) => {
      return course.instructors.includes(instructor.name);
    });
    res.status(200).json({ courses: existingCourses });
  } else {
    res.status(404).json({ message: "instructor not found" });
  }
});

instructorsRouter.get("/:id/courses/:courseId", (req, res) => {
  const id = req.params.id;
  const courseId = req.params.courseId;
  const instructor = instructors.find((inst) => inst.instructor_id == id);

  if (instructor) {
    const existingCourses = courses.filter((course) =>
      course.instructors.includes(instructor.name)
    );

    const course = existingCourses.find(
      (course) => course.course_id == courseId
    );

    if (course) {
      res.status(200).json({ course: course });
    } else {
      res.status(404).json({ message: "course not found" });
    }
  } else {
    res.status(404).json({ message: "instructor not found" });
  }
});

instructorsRouter.post("/", (req, res) => {
  const lastInsId = instructors[instructors.length - 1].instructor_id;
  const newIns = {
    ...req.body,
    instructor_id: lastInsId + 1,
  };

  instructors.push(newIns);
  res.status(201).json({ newIns });
});

instructorsRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  let insIndex;
  const ins = instructors.find((ins, index) => {
    if (ins.instructor_id == id) {
      insIndex = index;
      return true;
    }
  });

  if (!ins) {
    return res
      .status(404)
      .json({ message: `Instructor with id(${id}) Not found!` });
  }

  const updatedIns = {
    ...ins,
    ...req.body,
  };

  instructors[insIndex] = updatedIns;
  res.status(200).json({ updatedIns });
});

instructorsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const ins = instructors.find((ins) => ins.instructor_id == id);

	console.log(ins);

  if (!ins) {
    return res
      .status(404)
      .json({ message: `Instructor with id(${id}) Not found!` });
  }

  instructors = instructors.filter((ins) => ins.instructor_id != id);
  res.status(200).json({ ins });
});

module.exports = instructorsRouter;
