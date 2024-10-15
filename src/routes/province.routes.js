import express from "express";
import {
  getAllProvince,
  getProvince,
  postProvince,
} from "../controllers/province.controllers.js";
import { validateId, validatePostProvince } from "../utils/validator.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostProvince, postProvince);
router.get("/", getAllProvince);
router.get("/:id", validateId, getProvince);

export default router;
