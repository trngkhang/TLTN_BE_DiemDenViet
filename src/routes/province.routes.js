import express from "express";
import { postProvince } from "../controllers/province.controllers.js";
import { validatePostProvince } from "../utils/validator.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, validatePostProvince, postProvince);

export default router;
