import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controller/categoryController.js";
import verifyAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyAdmin, createCategory);        // POST   /api/categories
router.get("/", getAllCategories);                    // GET    /api/categories
router.get("/:id", getCategoryById);                 // GET    /api/categories/:id
router.put("/:id", verifyAdmin, updateCategory);     // PUT    /api/categories/:id
router.delete("/:id", verifyAdmin, deleteCategory);  // DELETE /api/categories/:id

export default router;
