require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/project4",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () =>
  console.log("mongo connected: ", process.env.MONGODB_URI)
);
db.on("disconnected", () => console.log("mongo disconnected"));

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const sessionsController = require("./controllers/sessionsController.js");
app.use("/sessions", sessionsController);

const usersController = require("./controllers/usersController.js");
app.use("/users", usersController);


app.listen(process.env.PORT || 4000);