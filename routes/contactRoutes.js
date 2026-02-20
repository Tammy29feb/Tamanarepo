import express from "express";
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact,
} from "../controller/contactController.js";
import verifyAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createContact);                          // POST   /api/contacts
router.get("/", verifyAdmin, getAllContacts);             // GET    /api/contacts
router.get("/:id", verifyAdmin, getContactById);         // GET    /api/contacts/:id
router.put("/:id", verifyAdmin, updateContact);          // PUT    /api/contacts/:id
router.delete("/:id", verifyAdmin, deleteContact);       // DELETE /api/contacts/:id

export default router;
