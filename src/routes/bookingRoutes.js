import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
} from "../controllers/bookingController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Manage lab booking requests
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create a new booking (Student)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *   get:
 *     summary: Get bookings
 *     description: Admin → all bookings, Student → own bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings
 *
 * /api/v1/bookings/{id}/status:
 *   patch:
 *     summary: Update booking status (Admin)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 *
 * /api/v1/bookings/{id}:
 *   delete:
 *     summary: Cancel a booking (Admin or Student)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - lab
 *         - subjectCode
 *         - date
 *         - startTime
 *         - endTime
 *       properties:
 *         lab:
 *           type: string
 *           example: "654abc123456"
 *         subjectCode:
 *           type: string
 *           example: "PRM392"
 *         date:
 *           type: string
 *           example: "2025-11-10"
 *         startTime:
 *           type: string
 *           example: "09:00"
 *         endTime:
 *           type: string
 *           example: "11:00"
 */

router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, (req, res, next) => {
  if (req.user.role === "admin") return getAllBookings(req, res, next);
  return getMyBookings(req, res, next);
});
router.patch("/:id/status", verifyToken, verifyAdmin, updateBookingStatus);
router.delete("/:id", verifyToken, cancelBooking);

export default router;
