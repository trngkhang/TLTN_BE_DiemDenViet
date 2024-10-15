import express from "express";
import { postdestinationType } from "../controllers/destinationType.controllers.js";
import { validatePostRegion } from "../utils/validator.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/",verifyAdmin, validatePostRegion, postdestinationType);

export default router;
