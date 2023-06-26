const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_id: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("categories", categorySchema);
