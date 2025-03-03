
const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyAdminToken } = require('../middleware/auth');  

const router = express.Router();

const JWT_SECRET = "m(qy`!~YfB^hvA*7kN#HuJ+bU6.;LQ$e'Fr]-npWSD94j&=3E123658749562149";
const adminCredentials = {
  email: "admin@example.com",
  password: "password123"
};

// Admin login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === adminCredentials.email && password === adminCredentials.password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
});

// Protected admin dashboard route
router.get('/dashboard', verifyAdminToken, (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!', admin: req.admin });
});

module.exports = router;


