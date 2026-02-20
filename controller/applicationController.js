import Application from "../models/Application.js";

// Create Application
export const createApplication = async (req, res) => {
    try {
        const { job, user } = req.body;
        const existing = await Application.findOne({ job, user });
        if (existing) return res.status(400).json({ success: false, message: "Already applied for this job" });

        const application = await Application.create(req.body);
        await application.populate(["job", "user"]);
        res.status(201).json({ success: true, message: "Application submitted", data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Applications
export const getAllApplications = async (req, res) => {
    try {
        const { status, job, user } = req.query;
        let filter = {};
        if (status) filter.status = status;
        if (job) filter.job = job;
        if (user) filter.user = user;

        const applications = await Application.find(filter)
            .populate("job", "title company location salary")
            .populate("user", "name email phone")
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Application
export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate("job")
            .populate("user", "-password");
        if (!application) return res.status(404).json({ success: false, message: "Application not found" });
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Application Status
export const updateApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!application) return res.status(404).json({ success: false, message: "Application not found" });
        res.status(200).json({ success: true, message: "Application updated", data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Application
export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) return res.status(404).json({ success: false, message: "Application not found" });
        res.status(200).json({ success: true, message: "Application deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
