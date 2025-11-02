import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Manage student information
 */

/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of students
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created successfully
 *
 * /api/v1/students/{id}:
 *   put:
 *     summary: Update student information
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - major
 *         - age
 *       properties:
 *         _id:
 *           type: string
 *           description: Automatically generated student ID
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john.doe@fpt.edu.vn
 *         major:
 *           type: string
 *           example: Software Engineering
 *         age:
 *           type: number
 *           example: 21
 */

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
