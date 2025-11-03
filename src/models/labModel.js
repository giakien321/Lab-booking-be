import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        capacity: { type: Number, required: true },
        available: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("Lab", labSchema);
