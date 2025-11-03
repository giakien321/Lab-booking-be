import Booking from "../models/bookingModel.js";
import Lab from "../models/labModel.js";

/**
 * Get all bookings (admin) or user's own bookings (student)
 */
export const getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === "admin") {
      bookings = await Booking.find()
        .populate("user", "name email role")
        .populate("lab", "name location")
        .sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find({ user: req.user.id })
        .populate("lab", "name location")
        .sort({ date: -1 });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

/**
 * Create booking (student)
 */
export const createBooking = async (req, res) => {
  try {
    const { labId, subjectCode, date, startTime, endTime } = req.body;

    if (!labId || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Optional: verify lab exists
    const lab = await Lab.findById(labId);
    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      lab: labId,
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
    console.error(error);
    res.status(400).json({ message: "Booking failed", error });
  }
};

/**
 * Approve booking (admin)
 */
export const approveBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking approved", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve booking", error });
  }
};

/**
 * Reject booking (admin)
 */
export const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking rejected", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject booking", error });
  }
};

/**
 * Cancel booking (student or admin)
 */
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only the creator or admin can cancel
    if (
      req.user.role !== "admin" &&
      booking.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking", error });
  }
};
