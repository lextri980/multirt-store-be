const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewSchema);
