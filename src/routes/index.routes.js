import express from "express";
import authRoutes from "./auth.routes.js";
import regionRoutes from "./region.routes.js";
import provinceRoutes from "./province.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/regions", regionRoutes);
router.use("/provinces", provinceRoutes);

export default router;
