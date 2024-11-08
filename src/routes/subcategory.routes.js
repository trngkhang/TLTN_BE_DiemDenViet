import express from "express";
import { validateId, validatePostSubcategory } from "../utils/validator.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  deleteSubcategory,
  getAllSubcategory,
  getSubcategory,
  postSubcategory,
  putSubcategory,
} from "../controllers/subcategory.controllers.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostSubcategory, postSubcategory);
router.get("/", getAllSubcategory);
router.get("/:id", validateId, getSubcategory);
router.put(
  "/:id",
  verifyAdmin,
  validateId,
  validatePostSubcategory,
  putSubcategory
);
router.delete("/:id", verifyAdmin, validateId, deleteSubcategory);

export default router;