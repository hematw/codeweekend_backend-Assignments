require("dotenv").config();
const express = require("express");
const connectDb = require("./db/connect");
const taskRouter = require("./routes/tasksRouter");

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hola amigos!");
});


app.use("/tasks", taskRouter)

const port = process.env.PORT;

async function start() {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, (err) => {
      console.log(`Server is running in port ${port} 🖥️`);
      console.log(`Database connected! ✨`);
    });
  } catch (err) {
    console.error(err);
  }
}

start()
