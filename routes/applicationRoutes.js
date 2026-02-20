import express from "express";
import {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
} from "../controller/applicationController.js";
import verifyAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createApplication);                        // POST   /api/applications
router.get("/", verifyAdmin, getAllApplications);           // GET    /api/applications
router.get("/:id", getApplicationById);                    // GET    /api/applications/:id
router.put("/:id", verifyAdmin, updateApplication);        // PUT    /api/applications/:id
router.delete("/:id", verifyAdmin, deleteApplication);     // DELETE /api/applications/:id

export default router;
