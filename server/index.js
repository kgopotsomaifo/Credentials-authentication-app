const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
const authRouter = require("./routes/auth");
const credentialsRoute = require("./routes/credentials");
const assignRoute = require("./routes/assign");
const ouDivisionRoute = require("./routes/ouDivision");
const userRoute = require("./routes/users");

app.use(express.json());

app.use(cors());

const mongoURI =
  "mongodb+srv:clustercooltech.5tdx6.mongodb.net/cooltech?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use(authRouter);
app.use(credentialsRoute);
app.use(assignRoute);
app.use(ouDivisionRoute);
app.use(userRoute);

// start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});


