import express from "express";
import {
  deleteTrip,
  generateTrip,
  getTrip,
  getTrips,
} from "../controllers/trip.controllers.js";
import { validateGenerateTrip, validateId } from "../middleware/validator.js";
import { verifyThisUserOrAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", validateGenerateTrip, generateTrip);
router.get("/:id", getTrip);
router.get("/", getTrips);
router.delete("/:id", verifyThisUserOrAdmin, validateId, deleteTrip);

export default router;
