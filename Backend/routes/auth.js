const express = require("express");
const router = express.Router();
const User = require("../models/User");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config({ path: `./config.env` });

//Register a new user
router.post("/register", async (req, res) => {
  const { username, password, email, phone } = req.body;

  const existingUser = await User.findOne({ username });
  const existingUserEmail = await User.findOne({ email });

  if (existingUser || existingUserEmail) {
    return res.status(400).json({ error: "User already exist" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create a new User with hashed password
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    phone,
  });
  await newUser.save();

  // Set user session
  req.session.user = {
    username: newUser.username,
    email: newUser.email,
  };

  res.status(202).json({ message: "User Registered Successfully " });
});

router.get("/admin", (req, res) => {
  // Serve the admin page or redirect to it
  res.redirect("http://localhost:5173/admin"); // Update this URL with your frontend URL
});

//Login
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    return res.redirect("/admin");
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }

  // Compare the hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  //  create Jwt-token
  const token = jwt.sign(
    { username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  await user.save();

  req.session.user = {
    username: user.username,
    email: user.email,
    token: token,
  };

  await user.save();

  res.status(200).json({
    username: username,
    message: "logged in successfully",
  });
});

//Sign in
router.post("/signin", async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }

  user.signInRecords.push({ date: new Date() });
  await user.save();

  res.status(200).json({ message: "Sign in recorded successfully" });
});

// Sign Out
router.post("/signout", async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }

  user.signOutRecords.push({ date: new Date() });
  await user.save();

  res.status(200).json({ message: "Sign out recorded successfully" });
});

// Route to fetch all usernames
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "username"); // Retrieve only the username field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

router.get("/protected-route", verifyToken, (req, res) => {
  res.status(200).json({ message: "This route is protected" });
});

// Fetch user attendance report
router.get("/attendance-report", async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }

  const { signInRecords, signOutRecords } = user;
  res.status(200).json({ signInRecords, signOutRecords });
});

module.exports = router;
