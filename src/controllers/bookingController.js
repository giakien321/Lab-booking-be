import Booking from "../models/bookingModel.js";
import Lab from "../models/labModel.js";
import Student from "../models/studentModel.js";

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("studentId", "name email")
      .populate("labId", "name location");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { studentId, labId, date, timeSlot } = req.body;

    if (!studentId || !labId || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const lab = await Lab.findById(labId);
    const student = await Student.findById(studentId);

    if (!lab || !student) {
      return res.status(404).json({ message: "Student or Lab not found" });
    }

    const newBooking = new Booking({ studentId, labId, date, timeSlot });
    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
