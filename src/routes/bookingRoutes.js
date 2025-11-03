import express from "express";
import {
  getBookings,
  createBooking,
  approveBooking,
  rejectBooking,
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
 *   get:
 *     summary: Get all bookings (admin) or your own (student)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings
 *   post:
 *     summary: Create a new booking
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
 *
 * /api/v1/bookings/{id}/approve:
 *   put:
 *     summary: Approve a booking request
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
 *         description: Booking approved
 *
 * /api/v1/bookings/{id}/reject:
 *   put:
 *     summary: Reject a booking request
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
 *         description: Booking rejected
 *
 * /api/v1/bookings/{id}:
 *   delete:
 *     summary: Cancel a booking (student or admin)
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
 *         - labId
 *         - date
 *         - timeSlot
 *       properties:
 *         _id:
 *           type: string
 *         labId:
 *           type: string
 *           description: ID of the lab to book
 *         date:
 *           type: string
 *           example: "2025-11-05"
 *         timeSlot:
 *           type: string
 *           example: "09:00 - 11:00"
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected, cancelled]
 */

router.get("/", verifyToken, getBookings);
router.post("/", verifyToken, createBooking);
router.put("/:id/approve", verifyToken, verifyAdmin, approveBooking);
router.put("/:id/reject", verifyToken, verifyAdmin, rejectBooking);
router.delete("/:id", verifyToken, cancelBooking);

export default router;
