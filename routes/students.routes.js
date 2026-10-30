import express from "express";
import * as studentsController from "../controllers/students.controller.js";

const router = express.Router();

//GET all students
router.get("/", studentsController.getAllStudents);

//GET single student
router.get("/:id", studentsController.getStudentById);

//POST lav en ny elev
router.post("/", studentsController.createStudent);

//PUT opdater en eksisterende elev
router.put("/:id", studentsController.updateStudent);

//DELETE slet en eksisterende elev
router.delete("/:id", studentsController.deleteStudent);

export default router;
