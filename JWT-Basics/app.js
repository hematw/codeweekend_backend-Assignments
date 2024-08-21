require("dotenv").config();
require("express-async-errors");
const express = require("express");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const mainRouter = require("./routes/mainRouter");

const app = express();
app.use(express.json());


app.use("/api/v1", mainRouter)
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on por ${port}`);
});
