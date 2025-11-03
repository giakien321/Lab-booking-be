import Booking from "../models/bookingModel.js";
import Lab from "../models/labModel.js";

export const getBookings = async (req, res) => {
  const filter = req.user.role === "admin" ? {} : { student: req.user.id };
  const bookings = await Booking.find(filter).populate("lab student", "name email location");
  res.status(200).json(bookings);
};

export const createBooking = async (req, res) => {
  const { labId, date, timeSlot } = req.body;
  const lab = await Lab.findById(labId);
  if (!lab) return res.status(404).json({ message: "Lab not found" });

  const booking = await Booking.create({
    student: req.user.id,
    lab: labId,
    date,
    timeSlot,
  });

  res.status(201).json(booking);
};

export const approveBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
  res.status(200).json(booking);
};

export const rejectBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
  res.status(200).json(booking);
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (req.user.role !== "admin" && booking.student.toString() !== req.user.id) {
    return res.status(403).json({ message: "Permission denied" });
  }
  booking.status = "cancelled";
  await booking.save();
  res.status(200).json(booking);
};
