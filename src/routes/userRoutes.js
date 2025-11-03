import express from "express";
import { getMe, getUsers, updateUserRole } from "../controllers/userController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage and view user information
 */

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Get the current logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user profile info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 * /api/v1/users:
 *   get:
 *     summary: Get list of all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 * /api/v1/users/{id}/role:
 *   patch:
 *     summary: Update a user's role (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [student, admin]
 *     responses:
 *       200:
 *         description: User role updated successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated user ID
 *         name:
 *           type: string
 *           example: "Nguyen Van A"
 *         email:
 *           type: string
 *           example: "a@fpt.edu.vn"
 *         role:
 *           type: string
 *           enum: [student, admin]
 *           example: "student"
 *         picture:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 */

router.get("/me", verifyToken, getMe); // current user info
router.get("/", verifyToken, verifyAdmin, getUsers); // admin get all users
router.patch("/:id/role", verifyToken, verifyAdmin, updateUserRole); // admin update role

export default router;
