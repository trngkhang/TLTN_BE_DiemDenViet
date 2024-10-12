import express from "express";
import { signup, signin, signout } from "../controllers/auth.controllers.js";
import { validateSignup, validateSignin } from "../utils/validator.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);
router.post("/signout", signout);

export default router;
