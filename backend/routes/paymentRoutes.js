import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { createPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/pay", auth, createPayment);

export default router;

