import express from "express";
import { generateTrip } from "../controllers/trip.controllers.js";
import { validateGenerateTrip } from "../utils/validator.js";

const router = express.Router();

router.post("/create", validateGenerateTrip, generateTrip);

export default router;
