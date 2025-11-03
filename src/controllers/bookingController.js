import Booking from "../models/bookingModel.js";
import Lab from "../models/labModel.js";

// Student: create a booking
export const createBooking = async (req, res) => {
  try {
    const { lab, subjectCode, date, startTime, endTime } = req.body;

    // check if lab exists
    const labExist = await Lab.findById(lab);
    if (!labExist) {
      return res.status(404).json({ message: "Lab not found" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      lab,
      subjectCode,
      date,
      startTime,
      endTime,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
};

// Student: view own bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("lab", "name location")
      .sort({ date: -1 });
    res.status(200).json({
      message: "Fetched user's bookings successfully",
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// Admin: view all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("lab", "name location")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Fetched all bookings successfully",
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all bookings", error: error.message });
  }
};

// Admin: approve or reject booking
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({
      message: `Booking ${status} successfully`,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking", error: error.message });
  }
};

// Cancel a booking (student or admin)
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // student can only cancel their own booking
    if (req.user.role !== "admin" && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking", error: error.message });
  }
};
