import express from "express";
import AuthMiddleware from "../middlewares/verifyToken.js";
import ReviewController from "../controllers/review.controllers.js";
import {
  validateDeleteReview,
  validateId,
  validateReview,
} from "../middlewares/validator.js";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.verifyUser,
  validateReview,
  ReviewController.post
);
router.get("/", ReviewController.getAll);
router.delete(
  "/:id",
  AuthMiddleware.verifyThisUserOrAdmin,
  validateId,
  validateDeleteReview,
  ReviewController.delete
);

export default router;
