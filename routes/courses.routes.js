import express from "express";
import * as coursesController from "../controllers/courses.controller.js";

const router = express.Router();

// GET all courses
router.get("/", coursesController.getAllCourses);

// GET single course
router.get("/:id", coursesController.getCourseById);

// POST lav nyt course
router.post("/", coursesController.createCourse);

// PUT update eksiterende course
router.put("/:id", coursesController.updateCourse);

// DELETE eksiterende course
router.delete("/:id", coursesController.deleteCourse);

// PUT skift teacher
router.put("/:id/teacher", coursesController.changeTeacher);

// PUT tilføj student
router.put("/:id/students/:studentId", coursesController.addStudent);

// DELETE fjern student
router.delete("/:id/students/:studentId", coursesController.removeStudent);

export default router;
