import express from "express";
import { getDashboardSummary } from "../controllers/dashboardController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin statistics and system summary
 */

/**
 * @swagger
 * /api/v1/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary (Admin only)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: number
 *                       example: 10
 *                     labs:
 *                       type: number
 *                       example: 5
 *                     bookings:
 *                       type: number
 *                       example: 23
 *                     bookingStatus:
 *                       type: object
 *                       properties:
 *                         pending:
 *                           type: number
 *                         approved:
 *                           type: number
 *                         rejected:
 *                           type: number
 *                         cancelled:
 *                           type: number
 */
router.get("/summary", verifyToken, verifyAdmin, getDashboardSummary);

export default router;
