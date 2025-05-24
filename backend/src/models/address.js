// models/Address.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: String,
  name: String,
  phone: String,
  pincode: String,
  address: String,
  city: String,
  state: String,
  sameAsBilling: Boolean,
}, { timestamps: true });

export default mongoose.model("Address", addressSchema);
