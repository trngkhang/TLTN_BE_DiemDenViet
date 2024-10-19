import express from "express";
import { getUserByToken } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/user-by-token", getUserByToken);

export default router;
