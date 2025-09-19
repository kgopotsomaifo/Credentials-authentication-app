const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import models
const Division = require("../models/division");
const OU = require("../models/ou");

// Function to verify the token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    console.log("Verify route accessed");
    console.log("Received Token:", token);
    return res.status(403).json({ error: "Token not provided" });
  }

  const tokenValue = token.split(" ")[1];

  // Verify the token using the extracted value
  jwt.verify(tokenValue, "cooltech", (err, decoded) => {
    if (err) {
      console.log("Error during token verification:", err);
      return res.status(403).json({ error: "Invalid token" });
    }

    req.tokenData = decoded;
    next();
  });
}

// Get a list of all OUs
router.get("/ous", verifyToken, async (req, res) => {
  try {
    ous = await OU.find();
    res.status(200).json(ous);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a list of all divisions
router.get("/divisions", verifyToken, async (req, res) => {
  try {
    const divisions = await Division.find();
    res.json(divisions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new OU
router.post("/ous", verifyToken, async (req, res) => {
  const userRole = req.tokenData.role;
  const userOU = req.tokenData.ou;

  try {
    const newOU = new OU({
      name: req.body.name,
    });

    const ou = await newOU.save();
    res.json(ou);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new division
router.post("/divisions", verifyToken, async (req, res) => {
  const userRole = req.tokenData.role;
  const userOU = req.tokenData.ou;

  try {
    const newDivision = new Division({
      name: req.body.name,
    });

    const division = await newDivision.save();
    res.json(division);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
