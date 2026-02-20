import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        coverLetter: { type: String },
        resume: { type: String },
        status: {
            type: String,
            enum: ["Pending", "Reviewed", "Shortlisted", "Rejected", "Hired"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
