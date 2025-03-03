const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      console.log("User found:", user);
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);
  
      if (!isMatch) {
        console.log("Password mismatch");
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      console.log("Login successful");
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;