import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { getReview, postReview } from "../controllers/review.controllers.js";
import { validateReview } from "../utils/validator.js";

const router = express.Router();

router.post("/", verifyUser, validateReview, postReview);
router.get("/", getReview);

export default router;
