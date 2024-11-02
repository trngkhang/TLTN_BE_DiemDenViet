import express from "express";
import authRoutes from "./auth.routes.js";
import regionRoutes from "./region.routes.js";
import provinceRoutes from "./province.routes.js";
import destinationTypeRoutes from "./destinationType.routes.js";
import destinationRoutes from "./destination.routes.js";
import reviewRoutes from "./review.routes.js";
import userRoutes from "./user.routes.js";
import districtRoutes from "./district.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/regions", regionRoutes);
router.use("/province", provinceRoutes);
router.use("/district", districtRoutes);
router.use("/destination-type", destinationTypeRoutes);
router.use("/destination", destinationRoutes);
router.use("/review", reviewRoutes);
router.use("/user", userRoutes);

export default router;
