import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        website: { type: String },
        location: { type: String },
        description: { type: String },
        logo: { type: String },
        industry: { type: String },
        isVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("Company", companySchema);
