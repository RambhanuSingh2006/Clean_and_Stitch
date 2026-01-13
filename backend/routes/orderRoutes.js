import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  createOrder,
  trackOrder,
  uploadMeasurements,
  markPaid,
  getMyOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

/* -------------------- USER ROUTES -------------------- */

// Create new order
router.post("/create", auth, createOrder);

// Fake payment
router.post("/pay/:id", auth, markPaid);

// Track order by tracking ID
router.get("/track/:orderId", trackOrder);

// Upload tailoring measurements
router.post("/measurements", auth, uploadMeasurements);

// Get logged-in user's order history
router.get("/my", auth, getMyOrders);

/* -------------------- ADMIN ROUTES -------------------- */

// Update order status (PLACED → PICKED_UP → DELIVERED)
router.put("/status/:id", auth, updateOrderStatus);

export default router;


