import express from "express";
import {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controller/userController.js";
import verifyAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);             // POST   /api/users/register
router.post("/login", loginUser);                   // POST   /api/users/login
router.get("/", verifyAdmin, getAllUsers);           // GET    /api/users
router.get("/:id", getUserById);                    // GET    /api/users/:id
router.put("/:id", updateUser);                     // PUT    /api/users/:id
router.delete("/:id", verifyAdmin, deleteUser);     // DELETE /api/users/:id

export default router;
