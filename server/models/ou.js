//model for a Organisational Unit
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ouSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const OU = mongoose.model("OU", ouSchema);

module.exports = OU;
