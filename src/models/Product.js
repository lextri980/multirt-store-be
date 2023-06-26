const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    images: { type: Array, required: true },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    model: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    inStock: { type: Number, required: true, default: 0 },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
