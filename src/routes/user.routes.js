import express from "express";
import UserController from "../controllers/user.controllers.js";
import { validateId, validatePutUser } from "../middlewares/validator.js";

const router = express.Router();

router.get("/user-by-token", UserController.getByToken);
router.put("/:id", validateId, validatePutUser, UserController.put);

export default router;
