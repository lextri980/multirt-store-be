const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role_id: {
    type: Number,
  },
  role_name: {
    type: String,
  },
});

module.exports = mongoose.model("roles", roleSchema);
