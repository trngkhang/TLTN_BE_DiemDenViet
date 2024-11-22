import express from "express";
import { getUserByToken, putUser } from "../controllers/user.controllers.js";
import { validateId, validatePutUser } from "../middleware/validator.js";

const router = express.Router();

router.get("/user-by-token", getUserByToken);
router.put("/:id", validateId, validatePutUser, putUser);

export default router;
