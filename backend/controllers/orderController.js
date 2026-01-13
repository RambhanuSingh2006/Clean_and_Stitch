import Order from "../models/Order.js";
import multer from "multer";

/* ===================== MULTER SETUP ===================== */
const upload = multer({ dest: "uploads/" });

/* ===================== CREATE ORDER (FROM CART) ===================== */
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      pickupDate,
      address,
      mobileNumber,
      paymentMethod
    } = req.body;

    /* ---------- AUTH ---------- */
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    /* ---------- BASIC VALIDATION ---------- */
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    if (!pickupDate || !address || !mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Pickup date, address and mobile number are required"
      });
    }

    if (String(mobileNumber).length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number"
      });
    }

    /* ---------- SANITIZE CART ITEMS ---------- */
    const cleanItems = items.map((item) => {
      if (
        !item.itemName ||
        !item.serviceType ||
        !item.quantity ||
        !item.pricePerItem
      ) {
        throw new Error("Invalid cart item structure");
      }

      return {
        itemName: item.itemName,
        serviceType: item.serviceType,
        quantity: Number(item.quantity),
        pricePerItem: Number(item.pricePerItem),
        totalPrice:
          Number(item.quantity) * Number(item.pricePerItem)
      };
    });

    /* ---------- CALCULATE TOTAL ON SERVER ---------- */
    const totalAmount = cleanItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    /* ---------- TRACKING ID ---------- */
    const orderId = "CS" + Date.now();

    /* ---------- CREATE ORDER ---------- */
    const order = await Order.create({
      user: req.user.id,
      items: cleanItems,
      totalAmount,
      pickupDate,
      address,
      mobileNumber,
      paymentMethod: paymentMethod || "ONLINE",
      paymentStatus: "PENDING",
      orderStatus: "PLACED",
      orderId
    });

    res.status(201).json({
      success: true,
      orderId: order.orderId,
      orderDbId: order._id
    });

  } catch (err) {
    console.error("❌ CREATE ORDER ERROR:", err.message);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/* ===================== UPDATE PAYMENT STATUS ===================== */
export const markPaid = async (req, res) => {
  try {
    const { method } = req.body;

    await Order.findByIdAndUpdate(req.params.id, {
      paymentStatus: method === "COD" ? "PENDING" : "PAID"
    });

    res.json({ success: true });
  } catch {
    res.status(500).json({
      success: false,
      message: "Payment update failed"
    });
  }
};

/* ===================== TRACK ORDER ===================== */
export const trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId
    });

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({ success: true, order });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* ===================== USER ORDER HISTORY ===================== */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* ===================== ADMIN: UPDATE ORDER STATUS ===================== */
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    );

    res.json({ success: true, order });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* ===================== UPLOAD MEASUREMENTS ===================== */
export const uploadMeasurements = [
  upload.single("photo"),
  async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.body.orderDbId,
        {
          measurements: JSON.parse(req.body.measurements),
          measurementPhoto: req.file?.path
        },
        { new: true }
      );

      res.json({ success: true, order });
    } catch {
      res.status(500).json({ success: false });
    }
  }
];












