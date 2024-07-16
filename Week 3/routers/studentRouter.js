const express = require("express");
const { students } = require("../data")


const studentRouter = express.Router()



studentRouter.get("/", (req, res) => {
    const { age } = req.query;
    let filteredStudents = students;
    if (age) {
        const [minAge, maxAge] = age.split('-');
        filteredStudents = students.
            filter(student => (student.age >= minAge && student.age <= maxAge))
    }

    res.status(200).json({ students: filteredStudents })
})

studentRouter.get("/:id(\\d+)", (req, res) => {
    const { id } = req.params;
    let student = students.find(student => student.student_id == id)
    if (student) {
        return res.status(200).json({ student })
    }
    res.status(402).json({ message: `invalid student id ${id}` })
})

studentRouter.get("/:major([a-zA-Z0-9%20]+)", (req, res) => {
    const { major } = req.params;
    let student = students.find(student => student.major.toLowerCase() == major.toLowerCase())
    if (student) {
        return res.status(200).json({ student })
    }
    res.status(402).json({ message: `invalid student id ${id}` })
})

module.exports = studentRouter;