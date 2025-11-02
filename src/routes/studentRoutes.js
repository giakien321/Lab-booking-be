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
 * /students:
 *   get:
 *     summary: Lấy danh sách sinh viên
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Danh sách sinh viên
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
 * /students/{id}:
 *   put:
 *     summary: Cập nhật thông tin sinh viên
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *         description: Cập nhật thành công
 *   delete:
 *     summary: Xóa sinh viên
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
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
 *         name:
 *           type: string
 *         age:
 *           type: number
 *         major:
 *           type: string
 *         email:
 *           type: string
 */

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
