const express = require("express");
const { instructors, courses } = require("../data");
const filter = require("../filter");


const instructorsRouter = express.Router();


instructorsRouter.get("/", (req, res) => {
    let filteredInstructors = instructors;
    for (let prop in req.query) {
        filteredInstructors = filter(filteredInstructors, prop, req.query[prop].split(","));
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

module.exports = instructorsRouter;