import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        lab: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
        date: { type: String, required: true },
        timeSlot: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
