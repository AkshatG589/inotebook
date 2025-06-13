const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Note = require("../models/Note");

// Replace with a more secure method (like env variable)
const ADMIN_SECRET = "admin@123";
router.get("/data", async (req, res) => {
  try {
    const secret = req.header("x-admin-secret");
    if (secret !== ADMIN_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const users = await User.find({}, "-password"); // Don't send password
    const notes = await Note.find();

    res.json({ users, notes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
