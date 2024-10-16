import express from "express";
import { postDestination } from "../controllers/destination.controllers.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { validatePostDestination } from "../utils/validator.js";

const router = express.Router();

router.post("/",verifyAdmin,validatePostDestination, postDestination);

export default router;
