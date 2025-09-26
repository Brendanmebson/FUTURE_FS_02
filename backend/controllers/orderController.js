import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const { items = [], shippingAddress = "" } = req.body;
  if (!items.length) return res.status(400).json({ message: "No items in order" });

  // Build items with price snapshot
  const itemsWithPrice = [];
  let total = 0;
  for (const it of items) {
    const p = await Product.findById(it.product);
    if (!p) return res.status(400).json({ message: `Product ${it.product} not found` });
    const price = p.price;
    itemsWithPrice.push({ product: p._id, quantity: it.quantity, price });
    total += price * it.quantity;
  }

  const order = await Order.create({
    user: req.user._id,
    items: itemsWithPrice,
    total,
    shippingAddress
  });

  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.product");
  res.json(orders);
};

// Admin: list all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email").populate("items.product");
  res.json(orders);
};
