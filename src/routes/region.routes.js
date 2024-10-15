import express from "express";
import {
  getAllRegion,
  getRegion,
  postRegion,
  putRegion,
} from "../controllers/region.controllers.js";
import { validateId, validatePostRegion } from "../utils/validator.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostRegion, postRegion);
router.get("/", getAllRegion);
router.get("/:id", validateId, getRegion);
router.put("/:id", verifyAdmin, validatePostRegion, putRegion);

export default router;
