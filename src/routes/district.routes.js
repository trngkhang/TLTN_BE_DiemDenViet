import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { validateId, validatePostDistrict } from "../utils/validator.js";
import {
  deleteDistrict,
  getAllDistrict,
  getDistrict,
  postDistrict,
  putDistrict,
} from "../controllers/district.controllers.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostDistrict, postDistrict);
router.get("/", getAllDistrict);
router.get("/:id", validateId, getDistrict);
router.put("/:id", verifyAdmin, validateId, validatePostDistrict, putDistrict);
router.delete("/:id", verifyAdmin, validateId, deleteDistrict);

export default router;
