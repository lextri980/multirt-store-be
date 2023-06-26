const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  brand_id: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("brands", brandSchema);
