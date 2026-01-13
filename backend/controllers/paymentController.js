import Order from "../models/Order.js";

/* -------------------- DEMO PAYMENT HANDLER -------------------- */
export const createPayment = async (req, res) => {
  try {
    const { orderId, method } = req.body; // ONLINE or COD

    if (!orderId || !method) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment request"
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Update payment based on method
    order.paymentMethod = method;

    if (method === "ONLINE") {
      order.paymentStatus = "PAID"; // demo success
    } else if (method === "COD") {
      order.paymentStatus = "PENDING"; // cash on delivery
    }

    await order.save();

    res.json({
      success: true,
      message: "Payment processed successfully",
      paymentStatus: order.paymentStatus
    });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({
      success: false,
      message: "Payment failed"
    });
  }
};
