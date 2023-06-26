const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
  address: { type: String, required: true },
  method: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("shipments", shipmentSchema);
