const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Function to verify the token
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
    req.userDivision = decoded.ou;
    next();
  });
}

// Route to Assign OUs, divisions, and roles to a user
router.post("/users/assign", verifyToken, async (req, res) => {
  const { userId, assignedOU, assignedDivision, assignedRole } = req.body;

  try {
    // Check if the user making the request is an admin
    if (req.userRole !== "admin") {
      return res.status(403).json({
        error:
          "Permission denied. Only admin users can assign OUs, divisions, and roles to users.",
      });
    }

    // Find the user by their ID
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user document with assigned OUs, divisions, and roles
    user.ou.push(assignedOU);
    user.division.push(assignedDivision);
    user.role = assignedRole;
    

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      error: "Failed to assign OUs, divisions, and roles to the user",
    });
  }
});

router.post("/users/unassign", verifyToken, async (req, res) => {
  const { userId, assignedOU, assignedDivision, assignedRole } = req.body;

  try {
    // Check if the user making the request is an admin
    if (req.userRole !== "admin") {
      return res.status(403).json({
        error:
          "Permission denied. Only admin users can assign OUs, divisions, and roles to users.",
      });
    }

    // Find the user by their ID
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // splice the unassigned ou and division from the array
    let indexOu = user.ou.indexOf(assignedOU);
    let indexDiv = user.division.indexOf(assignedDivision);
    if (indexOu !== -1) user.ou.splice(indexOu, 1);
    if (indexDiv !== -1) user.division.splice(indexDiv, 1);

    // below deletes whole array or the first item in the array
    // user.ou.splice(assignedOU, 1)
    // user.division.splice(assignedDivision, 1)
    user.role = assignedRole;
    

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      error: "Failed to assign OUs, divisions, and roles to the user",
    });
  }
});

module.exports = router;
