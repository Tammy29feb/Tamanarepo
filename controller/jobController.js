import Job from "../models/Job.js";

// Create Job
export const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json({ success: true, message: "Job created", data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Jobs
export const getAllJobs = async (req, res) => {
    try {
        const { category, location, jobType, search } = req.query;
        let filter = { isActive: true };
        if (category) filter.category = category;
        if (location) filter.location = { $regex: location, $options: "i" };
        if (jobType) filter.jobType = jobType;
        if (search) filter.title = { $regex: search, $options: "i" };

        const jobs = await Job.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Job
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Job
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });
        res.status(200).json({ success: true, message: "Job updated", data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Job
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });
        res.status(200).json({ success: true, message: "Job deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
