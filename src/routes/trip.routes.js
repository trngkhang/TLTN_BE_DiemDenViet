import express from "express";
import {
  generateTrip,
  getTrip,
  getTrips,
} from "../controllers/trip.controllers.js";
import { validateGenerateTrip } from "../utils/validator.js";

const router = express.Router();

router.post("/create", validateGenerateTrip, generateTrip);
router.get("/:id", getTrip);
router.get("/", getTrips);

export default router;
