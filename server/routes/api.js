const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/:user", async (req, res) => {
  try {
    const username = req.params.user;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User found",
      user: { username: user.username, links: user.links },
    });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
