import express from "express";
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
} from "../controller/jobController.js";
import verifyAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyAdmin, createJob);       // POST   /api/jobs
router.get("/", getAllJobs);                    // GET    /api/jobs
router.get("/:id", getJobById);                // GET    /api/jobs/:id
router.put("/:id", verifyAdmin, updateJob);    // PUT    /api/jobs/:id
router.delete("/:id", verifyAdmin, deleteJob); // DELETE /api/jobs/:id

export default router;
