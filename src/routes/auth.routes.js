import express from "express";
import { signup } from "../controllers/auth.controllers.js";
import { validateSignup } from "../utils/validator.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);

export default router;
