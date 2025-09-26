import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  price: Number
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [orderItemSchema],
  total: Number,
  status: { type: String, default: "Pending" },
  shippingAddress: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
