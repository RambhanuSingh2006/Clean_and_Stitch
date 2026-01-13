import User from "../models/User.js";

/* ===================== GET PROFILE ===================== */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    );

    res.json({
      success: true,
      user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    });
  }
};

/* ===================== UPDATE PROFILE ===================== */
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNumber,
      address,
      city,
      pincode
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        mobileNumber,
        address,
        city,
        pincode
      },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Profile update failed"
    });
  }
};
