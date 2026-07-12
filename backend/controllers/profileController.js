import User from "../models/userModel.js";

// ==========================
// Get Profile
// ==========================
export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Update Profile
// ==========================
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      username,
      email,
      phone,
      gender,
      dob,
      address,
      city,
      state,
      pincode,
    } = req.body;

    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    user.address = address || user.address;
    user.city = city || user.city;
    user.state = state || user.state;
    user.pincode = pincode || user.pincode;

    // Profile Image
    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};