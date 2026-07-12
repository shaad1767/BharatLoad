import express from "express";
import upload from "../middleware/upload.js";

import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

// Get Profile
router.get("/:id", getProfile);

// Update Profile
router.put(
  "/:id",
  upload.single("profileImage"),
  updateProfile
);

export default router;