import express from "express";
import { verifyThisUserOrAdmin, verifyUser } from "../utils/verifyToken.js";
import {
  getReview,
  postReview,
  deleteReview,
} from "../controllers/review.controllers.js";
import {
  validateDeleteReview,
  validateId,
  validateReview,
} from "../utils/validator.js";

const router = express.Router();

router.post("/", verifyUser, validateReview, postReview);
router.get("/", getReview);
router.delete(
  "/:id",
  verifyThisUserOrAdmin,
  validateId,
  validateDeleteReview,
  deleteReview
);

export default router;
