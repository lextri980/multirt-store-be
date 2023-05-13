const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true, trim: true },
    isAdmin: { type: Boolean, required: true, default: false },
    avatar: { type: Object, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
