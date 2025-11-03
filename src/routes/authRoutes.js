import express from "express";
import { googleLogin, refreshToken } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Google OAuth2 login and JWT token management
 */

/**
 * @swagger
 * /api/v1/auth/google:
 *   post:
 *     summary: Login using Google ID Token
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
 *                 description: Google ID Token from client
 *     responses:
 *       200:
 *         description: Successfully authenticated with Google
 *       400:
 *         description: Invalid or expired Google token
 *
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh access token
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
 *                 description: Refresh token
 *     responses:
 *       200:
 *         description: Returns a new access token
 */

router.post("/google", googleLogin);
router.post("/refresh", refreshToken);

export default router;
