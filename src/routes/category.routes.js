import express from "express";
import { validateId, validateName } from "../utils/validator.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  deleteCategory,
  getAllCategory,
  getCategory,
  postCategory,
  putCategory,
} from "../controllers/category.controllers.js"; 

const router = express.Router();

router.post("/", verifyAdmin, validateName, postCategory);
router.get("/", getAllCategory);
router.get("/:id", validateId, getCategory);
router.put("/:id", verifyAdmin, validateId, validateName, putCategory);
router.delete("/:id", verifyAdmin, validateId, deleteCategory); 

export default router;
