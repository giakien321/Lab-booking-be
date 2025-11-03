import Booking from "../models/bookingModel.js";
import Lab from "../models/labModel.js";

/**
 * Student: Create a new booking
 */
export const createBooking = async (req, res) => {
  try {
    const { lab, subjectCode, date, startTime, endTime } = req.body;

    // Check if lab exists
    const labExists = await Lab.findById(lab);
    if (!labExists) {
      return res.status(404).json({ message: "Lab not found" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      lab,
      subjectCode,
      date,
      startTime,
      endTime,
      status: "pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

/**
 *  Student: Get own bookings
 */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("lab", "name location")
      .sort({ date: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user bookings",
      error: error.message,
    });
  }
};

/**
 *  Admin: Get all bookings
 */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("lab", "name location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all bookings",
      error: error.message,
    });
  }
};

/**
 *  Admin: Approve or reject a booking
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("lab", "name location");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: `Booking ${status} successfully`,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update booking status",
      error: error.message,
    });
  }
};

/**
 *  Student or Admin: Cancel booking
 */
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only the owner or admin can cancel
    if (
      booking.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};
