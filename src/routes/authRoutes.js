import express from "express";
import { googleLogin, refreshToken } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Google OAuth2 Login and Token Management
 */

/**
 * @swagger
 * /api/v1/auth/google:
 *   post:
 *     summary: Login with Google token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Google ID Token
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/google", googleLogin);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: New tokens returned
 */
router.post("/refresh", refreshToken);

export default router;
