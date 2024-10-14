import express from "express";
import {
  getAllRegion,
  getRegion,
  postRegion,
} from "../controllers/region.controllers.js";
import {
  validateGetRegionbyId,
  validatePostRegion,
} from "../utils/validator.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostRegion, postRegion);
router.get("/", getAllRegion);
router.get("/:id", validateGetRegionbyId, getRegion);

export default router;
