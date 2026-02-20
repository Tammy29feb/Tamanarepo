import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        salary: { type: String },
        category: { type: String },
        jobType: { type: String, enum: ["Full-time", "Part-time", "Freelance", "Internship", "Remote"], default: "Full-time" },
        experience: { type: String },
        skills: [{ type: String }],
        deadline: { type: Date },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
