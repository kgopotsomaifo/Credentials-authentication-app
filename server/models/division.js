const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const divisionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Division = mongoose.model("Division", divisionSchema);

module.exports = Division;
