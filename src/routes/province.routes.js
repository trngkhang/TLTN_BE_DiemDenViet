import express from "express";
import {
  deleteProvince,
  getAllProvince,
  getProvince,
  postProvince,
  putProvince,
} from "../controllers/province.controllers.js";
import { validateId, validatePostProvince } from "../middleware/validator.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostProvince, postProvince);
router.get("/", getAllProvince);
router.get("/:id", validateId, getProvince);
router.put("/:id", verifyAdmin, validateId, validatePostProvince, putProvince);
router.delete("/:id", verifyAdmin, validateId, deleteProvince);

export default router;
