import express from "express";
import upload from "../middleware/upload.js";

import {
  registerPartner,
  getDriverDashboard,
  getDriverProfile,
  getDriverTrips,
  updateDriverProfile,
} from "../controllers/partnerController.js";

const router = express.Router();

// ==========================
// Register Driver Partner
// ==========================

router.post(
  "/register",
  upload.fields([
    { name: "driverPhoto", maxCount: 1 },
    { name: "licenseFile", maxCount: 1 },
    { name: "aadhaarFile", maxCount: 1 },
    { name: "panFile", maxCount: 1 },
    { name: "rcFile", maxCount: 1 },
    { name: "insuranceFile", maxCount: 1 },
    { name: "fitnessFile", maxCount: 1 },
    { name: "truckPhotos", maxCount: 10 },
  ]),
  registerPartner
);

// ==========================
// Dashboard
// ==========================

router.get("/dashboard/:id", getDriverDashboard);

// ==========================
// Driver Profile
// ==========================

router.get("/profile/:id", getDriverProfile);

// ==========================
// Driver Trips
// ==========================

router.get("/trips/:id", getDriverTrips);

// ==========================
// Update Driver Profile
// ==========================

router.put(
  "/profile/:id",
  upload.fields([
    { name: "driverPhoto", maxCount: 1 },
  ]),
  updateDriverProfile
);

// ==========================
// Update Truck
// ==========================

router.put(
  "/truck/:id",
  upload.fields([
    { name: "rcFile", maxCount: 1 },
    { name: "insuranceFile", maxCount: 1 },
    { name: "fitnessFile", maxCount: 1 },
    { name: "truckPhotos", maxCount: 10 },
  ]),
 updateDriverProfile
);

export default router;