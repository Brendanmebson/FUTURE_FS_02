import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createOrder, getMyOrders, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders); // admin can see all orders

export default router;
