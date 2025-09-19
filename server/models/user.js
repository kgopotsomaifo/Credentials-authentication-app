const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  ou: [
    {
      type: String,
      ref: "OU", // Refer to the OU model
    },
  ],
  division: [
    {
      type: String,
      ref: "Division", // Refer to the Division model
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

