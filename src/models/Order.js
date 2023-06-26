const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
    shipment: {
      type: Schema.Types.ObjectId,
      ref: "shipments",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    deliveryStatus: {
      type: String,
      enum: ["Confirming", "Taking", "Delivering", "Delivered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
