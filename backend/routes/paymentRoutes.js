import express from "express";
import { createCheckoutSession, verifySession } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Require user to be logged in to create a checkout session
router.post("/create-session", protect, createCheckoutSession);

// Verification doesn't necessarily need the user token because it's called on success page return
// but adding it protects against arbitrary requests. We'll leave it open for simplicity,
// or we can protect it. Let's not protect it so if token expires mid-checkout it still works.
router.post("/verify-session", verifySession);

export default router;
