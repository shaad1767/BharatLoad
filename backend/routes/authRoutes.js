import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  googleLogin
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/google-login", googleLogin);
router.post("/login", loginUser);

// 🔒 PROTECTED ROUTE
router.get("/", (req, res) => {
  res.json({ 
    message: "Protected route access granted",
    user: req.user 
  });
});

export default router;