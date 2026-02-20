import express from "express";
import adminLogin  from "../controller/adminConteroller.js";
import verifyAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin Login Route
router.post("/login", adminLogin);

// Protected Route
router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin Dashboard",
    adminId: req.admin.id
  });
});

export default router;
