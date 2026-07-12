import express from "express";
import { getSupportDetails } from "../controllers/supportController.js";

const router = express.Router();

router.get("/", getSupportDetails);

export default router;