import User from "../models/User.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export async function getUsers(req, res) {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
}
