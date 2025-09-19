const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const credentialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  division: {
    // type: Schema.Types.ObjectId,
    type: String,
    ref: "Divsion", // Reference to the Division model
    required: true,
  },
  ou: {
    // type: Schema.Types.ObjectId,
    type: String,
    ref: "OU", // Reference to the OU model
    required: true,
  },
});

module.exports = mongoose.model("Credential", credentialSchema);
