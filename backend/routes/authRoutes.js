import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔒 PROTECTED ROUTE
router.get("/Home", authMiddleware, (req, res) => {
  res.json({ 
    message: "Protected route access granted",
    user: req.user 
  });
});

export default router;