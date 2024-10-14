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

const router = express.Router();

router.post("/", validatePostRegion, postRegion);
router.get("/", getAllRegion);
router.get("/:id", validateGetRegionbyId, getRegion);

export default router;
