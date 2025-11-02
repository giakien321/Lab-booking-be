import express from "express";

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
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of labs
 *   post:
 *     summary: Create a new lab
 *     tags: [Labs]
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
 *   put:
 *     summary: Update lab information
 *     tags: [Labs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lab ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lab updated successfully
 *   delete:
 *     summary: Delete a lab
 *     tags: [Labs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lab ID
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
 *           description: Automatically generated lab ID
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

export default router;
