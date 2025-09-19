const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import Models
const User = require("../models/user");

// Verify Token function
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    console.log("Verify route accessed");
    return res.status(403).json({ error: "Token not provided" });
  }

  const tokenValue = token.split(" ")[1];

  // Verify the token using the extracted value
  jwt.verify(tokenValue, "cooltech", (err, decoded) => {
    if (err) {
      console.log("Error during token verification:", err);
      return res.status(403).json({ error: "Invalid token" });
    }

    // Log the decoded payload
    console.log(
      "Token Payload:",
      jwt.decode(tokenValue, { complete: true }).payload
    );

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.userOU = decoded.ou;
    req.userDivision = decoded.division;
    next();
  });
}

// Fetch user data based on the authenticated user's token
router.get("/user-data", verifyToken, async (req, res) => {
  try {
    // Get the user ID from the token
    const userId = req.userId;

    // Fetch user data from the database based on the user ID
    const user = await User.findById(userId).select(
      "username role ou division"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the user data back to the frontend
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Fetch a list of users for admin
router.get("/users", verifyToken, async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (req.userRole !== "admin") {
      return res.status(403).json({
        error:
          "Permission denied. Only admin users can access the list of users.",
      });
    }

    // Query the database to retrieve a list of users
    const users = await User.find({}, "username role ou division");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the list of users" });
  }
});

module.exports = router;
