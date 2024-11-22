import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { validateId, validatePostWard } from "../middleware/validator.js";
import {
  deleteWard,
  getAllWard,
  getWard,
  postWard,
  putWard,
} from "../controllers/ward.controllers.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostWard, postWard);
router.get("/", getAllWard);
router.get("/:id", validateId, getWard);
router.put("/:id", verifyAdmin, validateId, validatePostWard, putWard);
router.delete("/:id", verifyAdmin, validateId, deleteWard);

export default router;
