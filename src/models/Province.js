const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provinceSchema = new Schema({
  province_id: { type: String, required: true },
  name: { type: String, required: true },
  en_name: { type: String, required: true },
});

module.exports = mongoose.model("provinces", provinceSchema);
