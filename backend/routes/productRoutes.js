import express from "express";
import { getProducts, getProductById, createProductReview, getRelatedProducts } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id/related", getRelatedProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", protect, createProductReview);

export default router;
