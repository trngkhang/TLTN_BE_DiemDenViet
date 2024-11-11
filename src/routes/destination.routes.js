import express from "express";
import {
  postDestination,
  getDestination,
  putDestination,
  getDestinationById,
  getDestinationForUpdate,
} from "../controllers/destination.controllers.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { validateId, validatePostDestination } from "../utils/validator.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostDestination, postDestination);
router.get("/", getDestination);
router.get("/:id", validateId, getDestinationById);
router.get("/:id/update", validateId, getDestinationForUpdate);
router.put(
  "/:id",
  verifyAdmin,
  validateId,
  validatePostDestination,
  putDestination
);

export default router;
