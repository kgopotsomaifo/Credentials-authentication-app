const mongoose = require("mongoose");
const OU = require("./models/ou");
const Division = require("./models/division");

// connection URL
const mongoURI =
  "mongodb+srv://maifokgopotso:ISQn0RjPqeSeed6A@clustercooltech.5tdx6.mongodb.net/cooltech?retryWrites=true&w=majority";

// Connect to the MongoDB database
const connect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
connect();

// Sample OU data
const sampleOUData = [
  {
    name: "News Management",
  },
  {
    name: "Software Reviews",
  },
  {
    name: "Hardware Reviews",
  },
  {
    name: "Opinion Publishing",
  },
];

// Sample Division data
const sampleDivisionData = [
  {
    name: "Finance",
  },
  {
    name: "IT",
  },
  {
    name: "Writing",
  },
  {
    name: "Development",
  },
];
OU.deleteMany();
Division.deleteMany();

// Insert sample OU data into the database
OU.insertMany(sampleOUData)
  .then(() => {
    console.log("Sample OU data added to the database");
    return Division.insertMany(sampleDivisionData);
  })
  .then(() => {
    console.log("Sample division data added to the database");
  })
  .catch((error) => {
    console.error("Error adding sample OU data:", error);
  })
  .finally(() => {
    // Close the database connection
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  });
