import express from "express";
import { getAllRegion, postRegion } from "../controllers/region.controllers.js";
import { validatePostRegion } from "../utils/validator.js";

const router = express.Router();

router.post("/", validatePostRegion, postRegion);
router.get("/", getAllRegion);

export default router;
