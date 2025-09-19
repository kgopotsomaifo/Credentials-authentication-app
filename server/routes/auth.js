const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import the user model
const User = require("../models/user");

// Register a new user -- tested and works
router.post("/register", async (req, res) => {
  const { username, password, ou, division } = req.body;

  try {
    // Check if the username is already in use
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already in use" });
    }

    // Create a new user in the database with the plain text password, OU, and division
    const user = new User({
      username,
      password,
      role: "normal", // Default role
      ou,
      division,
    });

    await user.save();

    // Generate a JWT upon successful registration
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        ou: user.ou,
        division: user.division,
      },
      "cooltech",
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        ou: user.ou,
        division: user.division,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login -- tested and works
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Check if the provided password matches the stored password
    if (password !== user.password) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Define the payload
    const payload = {
      userId: user._id,
      role: user.role,
      ou: user.ou,
      division: user.division,
    };
    console.log("Token Payload:", payload); // Log the token payload

    // Generate a JWT upon successful login
    const token = jwt.sign(payload, "cooltech", {
      expiresIn: "1h",
      algorithm: "HS256",
    });

    // Log the token payload
    console.log(
      "Token Payload:",
      jwt.decode(token, { complete: true }).payload
    );

    // Send the token as a string
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        ou: user.ou,
        division: user.division,
      },
    });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
