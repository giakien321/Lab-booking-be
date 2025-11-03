import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin dashboard analytics and statistics
 */

/**
 * @swagger
 * /api/v1/dashboard:
 *   get:
 *     summary: Get dashboard statistics (admin only)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                   example: 120
 *                 totalLabs:
 *                   type: number
 *                   example: 10
 *                 totalBookings:
 *                   type: number
 *                   example: 230
 *                 bookingStatus:
 *                   type: object
 *                   example:
 *                     pending: 4
 *                     approved: 10
 *                     rejected: 2
 *                     cancelled: 1
 */

router.get("/", verifyToken, verifyAdmin, getDashboardStats);

export default router;
