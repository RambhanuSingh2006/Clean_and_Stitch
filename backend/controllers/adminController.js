import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json({ success: true, orders });
};

export const updateStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { paymentStatus: req.body.status },
    { new: true }
  );

  res.json({ success: true, order });
};
