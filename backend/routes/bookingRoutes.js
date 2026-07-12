import express from "express";
import {createBooking, getAllBookings, getBookingById, deleteBooking, updateBookingStatus
} from "../controllers/bookingController.js";

const router=express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.delete("/:id", deleteBooking);
router.put("/:id/status", updateBookingStatus);
export default router;