import express from "express";
import {
  getDriverProfile,
  getDriverDashboard,
  updateDriverProfile,
  updateTruck,
} from "../controllers/driverController.js";

import upload from "../middleware/upload.js"; // Multer middleware

const router = express.Router();

// ==========================
// Driver Dashboard
// ==========================
router.get("/dashboard/:id", getDriverDashboard);

// ==========================
// Driver Profile
// ==========================
router.get("/profile/:id", getDriverProfile);

// ==========================
// Update Driver Profile
// ==========================
router.put(
  "/profile/:id",
  upload.single("profileImage"), // Image field name
  updateDriverProfile
);

// ==========================
// Update Truck Details
// ==========================
router.put("/truck/:id", updateTruck);

export default router;