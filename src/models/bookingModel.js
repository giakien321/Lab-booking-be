import mongoose from "mongoose";

const boookingSchema = new mongoose.Schema(
    {
        studentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Student",
            required:true,
        },
        labId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Lab",
            required:true,
        },
        date:{
            type: String,
            required: true,
        },
        timeSlot:{
            type: String,
            required: true,
        },
    },
    {timestamps:true}
);

const Booking = mongoose.model("Booking", boookingSchema);

export default Booking;