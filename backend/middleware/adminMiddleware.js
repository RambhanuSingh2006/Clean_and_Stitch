export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.json({ success: false, message: "Admins only" });
  }
  next();
};
