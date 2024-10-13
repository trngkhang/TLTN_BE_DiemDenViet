import express from "express";
import { postRegion } from "../controllers/region.controllers.js";
import { validatePostRegion } from "../utils/validator.js";

const router = express.Router();

router.post("/", validatePostRegion, postRegion);

export default router;
