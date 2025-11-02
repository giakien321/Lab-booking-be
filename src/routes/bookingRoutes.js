import express from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Manage lab room booking schedules
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of bookings
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
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
 * /api/v1/bookings/{id}:
 *   put:
 *     summary: Update booking details
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - studentId
 *         - labId
 *         - date
 *         - timeSlot
 *       properties:
 *         _id:
 *           type: string
 *           description: Automatically generated booking ID
 *         studentId:
 *           type: string
 *           example: 67292a2f812ab74a2b9a
 *         labId:
 *           type: string
 *           example: 67293baf812ab74a2b9b
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-11-03
 *         timeSlot:
 *           type: string
 *           example: "8:00 - 10:00"
 */

export default router;
