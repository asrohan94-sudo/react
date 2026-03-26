import User from "../models/UserModel.js";

// This middleware updates user's lastActive and isActive
export const trackActivity = async (req, res, next) => {
  try {
    if (req.user) { // make sure user is authenticated
      await User.findByIdAndUpdate(req.user.id, {
        lastActive: Date.now(),
        isActive: true,
      });
    }
  } catch (err) {
    console.error("Error updating active log:", err);
  }
  next();
};