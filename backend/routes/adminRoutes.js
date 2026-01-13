import express from "express";
import {
  getAllOrders,
  updateStatus
} from "../controllers/adminController.js";

import { auth } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/orders", auth, adminOnly, getAllOrders);
router.post("/status/:id", auth, adminOnly, updateStatus);

export default router;

