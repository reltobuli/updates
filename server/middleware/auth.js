const jwt = require('jsonwebtoken');
const JWT_SECRET = "m(qy`!~YfB^hvA*7kN#HuJ+bU6.;LQ$e'Fr]-npWSD94j&=3E123658749562149";  // Secret for JWT

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;  // Attach decoded user info (admin) to the request
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyAdminToken };