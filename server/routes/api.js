const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/:user", async (req, res) => {
  try {
    const username = req.params.user;

    if (username.toLowerCase() === "admin") {
      res.status(400).json({ message: "Admin redirect" });
    }

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

router.put("/:user/bio", async (req, res) => {
  try {
    console.log("a");
    const username = req.params.user;
    const bio = req.body.bio;

    const user = await User.findOneAndUpdate(
      { username },
      { bio },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated",
      user: { username: user.username, bio: user.bio },
    });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
