import User from "../models/userModel.js";
import Lab from "../models/labModel.js";
import Booking from "../models/bookingModel.js";

// Admin Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalLabs = await Lab.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const bookingStatus = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // convert array to object { pending: X, approved: Y, ... }
    const statusCount = bookingStatus.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      stats: {
        totalUsers,
        totalLabs,
        totalBookings,
        bookingStatus: statusCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard data", error: error.message });
  }
};
