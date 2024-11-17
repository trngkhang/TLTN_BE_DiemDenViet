import express from "express";
import { generateTrip, getTrip } from "../controllers/trip.controllers.js";
import { validateGenerateTrip } from "../utils/validator.js";

const router = express.Router();

router.post("/create", validateGenerateTrip, generateTrip);
router.get("/:id", getTrip);

export default router;
