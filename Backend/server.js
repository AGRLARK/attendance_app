const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const Port = 4000;
const uuid = require("uuid").v4;

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: uuid(),
    resave: false,
    saveUninitialized: true,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/attendance");

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const authRoutes = require("./routes/auth.js");
app.use("/", authRoutes);

app.get("/home", (req, res) => {
  if (!req.session.user) {
    // Redirect to login if session is not set
    return res.redirect("/");
  }
  res.send("Home page");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(Port, () => {
  console.log(`Server running at ${Port}`);
});
