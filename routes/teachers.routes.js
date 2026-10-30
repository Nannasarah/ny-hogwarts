import express from "express";
import * as teachersController from "../controllers/teachers.controller.js";

const router = express.Router();

// GET all teachers
router.get("/", teachersController.getAllTeachers);

// GET single teacher
router.get("/:id", teachersController.getTeacherById);

// POST lav en ny lærer
router.post("/", teachersController.createTeacher);

// PUT opdater en eksisterende lærer
router.put("/:id", teachersController.updateTeacher);

// DELETE slet en eksisterende lærer
router.delete("/:id", teachersController.deleteTeacher);

export default router;
