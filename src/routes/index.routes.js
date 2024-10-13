import express from "express";
import authRoutes from "./auth.routes.js";
import regionRoutes from "./region.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/regions", regionRoutes);

export default router;
