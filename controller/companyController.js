import Company from "../models/Company.js";

// Create Company
export const createCompany = async (req, res) => {
    try {
        const exists = await Company.findOne({ email: req.body.email });
        if (exists) return res.status(400).json({ success: false, message: "Company with this email already exists" });

        const company = await Company.create(req.body);
        res.status(201).json({ success: true, message: "Company created", data: company });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Companies
export const getAllCompanies = async (req, res) => {
    try {
        const { search, industry } = req.query;
        let filter = { isActive: true };
        if (industry) filter.industry = industry;
        if (search) filter.name = { $regex: search, $options: "i" };

        const companies = await Company.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: companies.length, data: companies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Company
export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ success: false, message: "Company not found" });
        res.status(200).json({ success: true, data: company });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Company
export const updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!company) return res.status(404).json({ success: false, message: "Company not found" });
        res.status(200).json({ success: true, message: "Company updated", data: company });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Company
export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) return res.status(404).json({ success: false, message: "Company not found" });
        res.status(200).json({ success: true, message: "Company deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
