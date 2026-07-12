import express from "express";
import authRoutes from "./authRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import partnerRoutes from "./partnerRoutes.js";
import  driverRoutes  from "./driverRoutes.js";
import profileRoutes from "./profileRoutes.js";
import supportRoutes from "./supportRoutes.js";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payment", paymentRoutes);
router.use("/partner", partnerRoutes);
router.use("/driver", driverRoutes);
router.use("/profile", profileRoutes);
router.use("/support", supportRoutes);

export default router;