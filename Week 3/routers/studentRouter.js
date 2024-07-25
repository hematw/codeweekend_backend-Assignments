const express = require("express");
const { students } = require("../data");

const studentRouter = express.Router();

studentRouter.get("/", (req, res) => {
  const { age } = req.query;
  let filteredStudents = students;
  if (age) {
    const [minAge, maxAge] = age.split("-");
    filteredStudents = students.filter(
      (student) => student.age >= minAge && student.age <= maxAge
    );
  }

  res.status(200).json({ students: filteredStudents });
});

studentRouter.get("/:id(\\d+)", (req, res) => {
  const { id } = req.params;
  let student = students.find((student) => student.student_id == id);
  if (student) {
    return res.status(200).json({ student });
  }
  res.status(402).json({ message: `invalid student id ${id}` });
});

studentRouter.get("/:major([a-zA-Z0-9%20]+)", (req, res) => {
  const { major } = req.params;
  let student = students.filter(
    (student) => student.major.toLowerCase() == major.toLowerCase()
  );
  return res.status(200).json({ student });
});

studentRouter.post("/", (req, res) => {
  const lastStuId = students[students.length - 1].student_id;
  const newStudent = {
    ...req.body,
    student_id: lastStuId + 1,
  };
  students.push(newStudent);
  res.status(201).json({ newStudent });
});

studentRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  let studentIndex;
  const student = students.find((stu, index) => {
    if (stu.student_id == id) {
      studentIndex = index;
      return true;
    }
  });
  if (!student) {
    return res
      .status(404)
      .json({ message: `Student with id(${id}) Not found!` });
  }
  const updatedStudent = {
    ...student,
    ...req.body,
  };
  students[studentIndex] = updatedStudent;
  res.status(200).json({ updatedStudent });
});

studentRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const student = students.find((stu) => stu.student_id == id);
  console.log(student);
  if (!student) {
    return res
      .status(404)
      .json({ message: `Student with id(${id}) Not found!` });
  }
  students = students.filter((stu) => stu.student_id != id);
  res.status(200).json({ student });
});

module.exports = studentRouter;
