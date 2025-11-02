import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
        },
        capacity:{
            type: Number,
            required: true,
            min: 1,
        },
    },
    { timestamps: true}
);

const Lab = mongoose.model("Lab", labSchema);

export default Lab;