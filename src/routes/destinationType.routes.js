import express from "express";
import {
  deleteDestinationType,
  getAllDestinationType,
  getDestinationType,
  postDestinationType,
  putDestinationType,
} from "../controllers/destinationType.controllers.js";
import {
  validateId,
  validatePostRegion,
  validatePutRegion,
} from "../utils/validator.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostRegion, postDestinationType);
router.get("/", getAllDestinationType);
router.get("/:id", validateId, getDestinationType);
router.put(
  "/:id",
  verifyAdmin,
  validateId,
  validatePutRegion,
  putDestinationType
);
router.delete("/:id", verifyAdmin, validateId, deleteDestinationType);

export default router;
