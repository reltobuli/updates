const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin"); // Import Admin model
const { verifyAdminToken } = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = "m(qy`!~YfB^hvA*7kN#HuJ+bU6.;LQ$e'Fr]-npWSD94j&=3E123658749562149";

// Admin login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ email: admin.email, id: admin._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Protected admin dashboard route
router.get("/dashboard", verifyAdminToken, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!", admin: req.admin });
});

module.exports = router;


