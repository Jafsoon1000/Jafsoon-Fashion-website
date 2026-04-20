import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) return res.status(401).json({ error: "Not authorized. Missing token." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ error: "User not found." });
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
}

export async function admin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Not authorized as an admin" });
  }
}
