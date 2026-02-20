import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        subject: { type: String },
        message: { type: String, required: true },
        status: { type: String, enum: ["Unread", "Read", "Replied"], default: "Unread" },
    },
    { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
