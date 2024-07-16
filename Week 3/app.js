const express = require("express");
const instructorsRouter = require("./routers/instructorsRouter")
const coursesRouter = require("./routers/coursesRouter")
const studentRouter = require("./routers/studentRouter")


const app = express();
const PORT = 3000;

app.use("/instructors", instructorsRouter);
app.use("/courses", coursesRouter);
app.use("/students", studentRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Incorrect endpoint resource Not Found!' });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
