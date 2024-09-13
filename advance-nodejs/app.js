require("dotenv").config();
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const session = require("express-session");
const passportConfig = require("./middlewares/passportConfig");
const connectDb = require("./db/connect");
const authRouter = require("./routes/auth");
const passportSocketIO = require("passport.socketio");
const cookieParser = require("cookie-parser");
const sessionStore = new session.MemoryStore();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.use(
  passportSocketIO.authorize({
    cookieParser,
    key: "express.sid",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    success: (data, accept) => {
      console.log("Socket authenticated successfully!");
      accept();
    },
    fail: (data, message, error, accept) => {
      console.error("Socket authentication failed:", message);
      accept(new Error("Unauthorized"));
    },
  })
);

let users = 0;
io.on("connection", (socket) => {
  ++users;
  console.log(`${users} connected socket!`);

  io.emit("update", {
    name: socket.request.user.username,
    currentUsers: users,
    connected: true,
  });

  socket.on("chat message", (message) => {
    io.emit("chat message", {
      username: socket.request.user.username,
      message,
    });
  });

  socket.on("disconnect", () => {
    --users;
    io.emit("update", {
      name: socket.request.user.username,
      currentUsers: users,
      connected: false,
    });
  });
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    key: "express.sid",
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 30 * 60 * 60 * 1000, // One Month
    },
  })
);

app.use(passportConfig.initialize());
app.use(passportConfig.session());

app.use(authRouter);

app.use((req, res, next) => {
  req.isAuthenticated() ? next() : res.status(401).redirect("/login");
});

app.get("/secret", (req, res) => {
  res.render("secret", { username: req.user.username.toUpperCase() });
});

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDb();
    console.log("Database connected ✅");
    server.listen(port, () => {
      console.log(`Server is running in port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
