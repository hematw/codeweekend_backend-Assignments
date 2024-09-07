require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passportConfig = require("./middlewares/passportConfig");
const connectDb = require("./db/connect");
const authRouter = require("./routes/auth");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SEC,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 60 * 1000, // One Month
    },
  })
);

app.use(passportConfig.initialize());
app.use(passportConfig.session());

app.use(authRouter)

app.use((req, res, next) => {
  req.isAuthenticated() ? next() : res.status(401).redirect("/login");
});

app.get("/secret", (req, res) => {
  console.log("user data", req.user);
  res.render("secret", { username: req.user.username.toUpperCase() });
});

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDb();
    console.log("Database connected ✅");
    app.listen(port, () => {
      console.log(`Server is running in port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
