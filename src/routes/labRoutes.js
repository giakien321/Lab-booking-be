import express from "express";
import {
  getLabs,
  getLabById,
  createLab,
  updateLab,
  deleteLab,
} from "../controllers/labController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Labs
 *   description: Manage lab room information
 */

/**
 * @swagger
 * /api/v1/labs:
 *   get:
 *     summary: Get all labs
 *     tags: [Labs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of labs
 *
 *   post:
 *     summary: Create a new lab (Admin only)
 *     tags: [Labs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lab'
 *     responses:
 *       201:
 *         description: Lab created successfully
 *
 * /api/v1/labs/{id}:
 *   get:
 *     summary: Get lab by ID
 *     tags: [Labs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lab ID
 *     responses:
 *       200:
 *         description: Successfully retrieved lab
 *
 *   put:
 *     summary: Update lab information (Admin only)
 *     tags: [Labs]
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
 *         description: Lab updated successfully
 *
 *   delete:
 *     summary: Delete a lab (Admin only)
 *     tags: [Labs]
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
 *         description: Lab deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Lab:
 *       type: object
 *       required:
 *         - name
 *         - location
 *         - capacity
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           example: Lab A101
 *         location:
 *           type: string
 *           example: FPT University - Building A
 *         capacity:
 *           type: number
 *           example: 40
 */

router.get("/", verifyToken, getLabs);
router.get("/:id", verifyToken, getLabById); // 👈 thêm mới để GET theo ID
router.post("/", verifyToken, verifyAdmin, createLab);
router.put("/:id", verifyToken, verifyAdmin, updateLab);
router.delete("/:id", verifyToken, verifyAdmin, deleteLab);

export default router;
