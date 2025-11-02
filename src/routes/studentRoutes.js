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
 *   description: Quản lý sinh viên trong hệ thống FPT Lab Booking
 */

/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     summary: Lấy danh sách sinh viên
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Danh sách sinh viên
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *   post:
 *     summary: Thêm sinh viên mới
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Sinh viên được tạo thành công
 */

/**
 * @swagger
 * /api/v1/students/{id}:
 *   put:
 *     summary: Cập nhật thông tin sinh viên
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sinh viên cần cập nhật
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
 *         description: Cập nhật sinh viên thành công
 *   delete:
 *     summary: Xóa sinh viên
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sinh viên cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa sinh viên thành công
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - major
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của sinh viên (tự động sinh bởi MongoDB)
 *         name:
 *           type: string
 *           description: Họ tên sinh viên
 *           example: Nguyen Van A
 *         age:
 *           type: number
 *           description: Tuổi sinh viên
 *           example: 21
 *         major:
 *           type: string
 *           description: Chuyên ngành
 *           example: Software Engineering
 *         email:
 *           type: string
 *           description: Email sinh viên FPT
 *           example: nva@fpt.edu.vn
 */

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
