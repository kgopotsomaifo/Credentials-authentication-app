const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  ou: [
    {
      // type: Schema.Types.ObjectId,
      type: String,
      ref: "OU", // Refer to the OU model
    },
  ],
  division: [
    {
      // type: Schema.Types.ObjectId,
      type: String,
      ref: "Division", // Refer to the Division model
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
