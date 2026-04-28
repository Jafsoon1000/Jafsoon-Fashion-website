import { Router } from "express";
import { login, me, register, sendOtp, verifyPhone, socialLogin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/social", socialLogin);
router.post("/send-otp", sendOtp);
router.post("/verify-phone", verifyPhone);
router.get("/me", protect, me);

export default router;
