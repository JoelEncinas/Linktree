// routes/protected.js
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

// Protected route
router.get("/", (req, res) => {
  // Verify JWT token
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.json({
      message: "Access granted to protected route",
      userId: decoded.userId,
    });
  });
});

module.exports = router;
