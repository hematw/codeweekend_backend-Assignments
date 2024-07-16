const express = require("express");
const { instructors, courses, students } = require("../data")
const filter = require("../filter");


const coursesRouter = express.Router()

coursesRouter.get("/", (req, res) => {
    let filteredCourses = courses;
    for (let prop in req.query) {
        filteredCourses = filter(filteredCourses, prop, req.query[prop].split(","));
    }
    res.status(200).json({ courses: filteredCourses });
})

coursesRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const course = courses.find(course => course.course_id == id)

    if (course) {
        return res.status(200).json({ course })
    }
    return res.status(404).json({ message: `invalid course id ${id}` })
})

coursesRouter.get("/:id/instructors", (req, res) => {
    const { id } = req.params;
    const course = courses.find(course => course.course_id == id)

    if (course) {
        const courseInstructors = instructors
            .filter(ins => course.instructors.includes(ins.name))
        return res.status(200).json({ instructors: courseInstructors })
    }
    return res.status(404).json({ message: `invalid course id ${id}` })
})

coursesRouter.get("/:id/students", (req, res) => {
    const { id } = req.params;
    const course = courses.find(course => course.course_id == id)

    if (course) {
        const courseStudents = students
            .filter(student => student.courses.includes(course.course_name))
        return res.status(200).json({ students: courseStudents })
    }
    return res.status(404).json({ message: `invalid course id ${id}` })
})

module.exports = coursesRouter;