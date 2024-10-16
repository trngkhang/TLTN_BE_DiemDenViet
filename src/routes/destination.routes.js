import express from "express";
import {
  postDestination,
  getDestination,
} from "../controllers/destination.controllers.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { validatePostDestination } from "../utils/validator.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostDestination, postDestination);
router.get("/", getDestination);

export default router;
