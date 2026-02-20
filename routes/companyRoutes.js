import express from "express";
import {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
} from "../controller/companyController.js";
import verifyAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createCompany);                           // POST   /api/companies
router.get("/", getAllCompanies);                          // GET    /api/companies
router.get("/:id", getCompanyById);                       // GET    /api/companies/:id
router.put("/:id", verifyAdmin, updateCompany);           // PUT    /api/companies/:id
router.delete("/:id", verifyAdmin, deleteCompany);        // DELETE /api/companies/:id

export default router;
