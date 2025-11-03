import User from "../models/userModel.js";
import Lab from "../models/labModel.js";
import Booking from "../models/bookingModel.js";

// @desc Get dashboard statistics
// @route GET /api/v1/dashboard/summary
// @access Admin only
export const getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalLabs = await Lab.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Đếm số booking theo trạng thái
    const bookingStatusCounts = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const statusSummary = bookingStatusCounts.reduce((acc, cur) => {
      acc[cur._id] = cur.count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        users: totalUsers,
        labs: totalLabs,
        bookings: totalBookings,
        bookingStatus: {
          pending: statusSummary.pending || 0,
          approved: statusSummary.approved || 0,
          rejected: statusSummary.rejected || 0,
          cancelled: statusSummary.cancelled || 0,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
      error: error.message,
    });
  }
};
