const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// import models
const User = require("../models/user");
const Credential = require("../models/credential");

// Function to verify the token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
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

// View credentials for the logged-in user
router.get("/credentials", verifyToken, async (req, res) => {
  console.log("Entered /credentials route");
  try {
    let credentials;
    if (req.userRole === "admin" ) {
      // Admin can view all credentials
      credentials = await Credential.find();
    } else if (req.userRole === "management" || req.userRole === "normal") {
      console.log("Management/Normal user access");
      // Get the OU and division from the logged-in user's data
      const user = await User.findById(req.userId);
      const userOU = user.ou; // Get the user's OU
      const userDivision = user.division; // Get the user's division

      // Fetch credentials based on the user's OU and division
      credentials = await Credential.find({
        ou: userOU,
        division: userDivision,
      });
    }
    res.status(200).json(credentials);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch credentials", details: error.message });
  }
});

// Fetch credentials based on OU or division(********)
router.get("/credentials/:type/:id", verifyToken, async (req, res) => {
  const { type, id } = req.params;
  try {
    // Check if the user is an admin
    if (req.userRole !== "admin") {
      return res.status(403).json({
        error: "Permission denied. Only admin users can access this route.",
      });
    }
    // Query the database to retrieve credentials for the specified OU or division
    const credentials = await Credential.find({
      [type]: id,
    });
    res.status(200).json(credentials);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch credentials", details: error.message });
  }
});

// Add credentials
router.post("/credentials", verifyToken, async (req, res) => {
  try {
    // Assign values to the variables
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let division = req.body.division;
    let ou = req.body.ou;

    // Check the user's role to ensure they have permission to add credentials
    if (req.userRole === "admin" ) {
      console.log("Admin user");
      // Admins can add credentials to any OU and division.
    } else if (req.userRole === "management" || req.userRole === "normal") {
      console.log("User OU:", req.userOU);
      console.log("User Division:", req.userDivision);
      // Check if the user is assigned to the OU and division they are trying to add credentials to.
      if (!req.userOU.includes(ou) && !req.userDivision.includes(division)) {
        return res.status(403).json({
          error:
            "Permission denied. You can only add credentials to your assigned OU and division.",
        });
      }
    }
    // Proceed with the credential addition for all users.
    const newCredential = new Credential({
      name,
      username,
      password,
      division,
      ou,
    });

    const savedCredential = await newCredential.save();
    res.status(201).json(savedCredential);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create a new credential",
      details: error.message,
    });
  }
});

// Update an existing credential
router.put("/credentials/:id", verifyToken, async (req, res) => {
  // Check the user's role to ensure they have permission to update credentials
  if (req.userRole !== "admin" && req.userRole !== "management") {
    return res.status(403).json({ error: "Permission denied" });
  }

  const { id } = req.params;
  const { name, username, password, division, ou } = req.body;

  try {
    const updatedCredential = await Credential.findByIdAndUpdate(id, {
      name,
      username,
      password,
      division,
      ou,
    });

    if (!updatedCredential) {
      return res.status(404).json({ error: "Credential not found" });
    }

    res.status(200).json(updatedCredential);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update the credential",
      details: error.message,
    });
  }
});

module.exports = router;
