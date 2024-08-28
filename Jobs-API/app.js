require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connect = require("./db/connect");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Hello MR LAzy" });
});


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", jobsRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Server is running and MongoDB connnected! ✅");
  } catch (error) {
    console.log(error);
  }
});
