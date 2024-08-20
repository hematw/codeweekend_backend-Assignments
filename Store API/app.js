require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const productsRouter = require("./routes/products-router");

const app = express();
app.use(express.json());

app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

app.listen(port, async () => {
  try {
    await connectDB(mongoUri);
    console.log("Server created and DB is connected! 🫡");
  } catch (error) {
    console.log(error);
  }
});
