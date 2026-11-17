// Henter alle funktioner fra students-repository'et
import * as studentsRepository from "../repositories/students.repository.js";
import httperror from "../errorhandling/httperror.js";
import CreateStudentDto from "../dtos/createstudent.dto.js";
import UpdateStudentDto from "../dtos/updatestudent.dto.js";

// GET all students
export async function getAllStudents(req, res) {
  const students = await studentsRepository.getAllStudents();
  res.status(200).json(students);
}

// GET single student
export async function getStudentById(req, res) {
  const id = req.params.id;
  const student = await studentsRepository.getStudentById(id);

  // Findes ikke → 404 Not Found.
  // Vi tjekker for fejlen FØRST, så throw ikke kører efter at svaret allerede er sendt
  if (!student) {
    throw new httperror(404, "Student does not exist");
  }

  res.status(200).json(student);
}

// POST lav en ny student
export async function createStudent(req, res) {
  const data = req.body;
  const student = CreateStudentDto.parse(data);

  const newStudent = await studentsRepository.createStudent(student);
  res.status(201).json(newStudent);
}

// PUT opdater eksisterende student
// Forventer en body ved test der ser sådan ud: { "name": "Nanna Pedersen", "house_id": 1 }
export async function updateStudent(req, res) {
  const id = req.params.id;
  const data = req.body;
  const student = UpdateStudentDto.parse(data);

  const updatedStudent = await studentsRepository.updateStudent(id, student);

  if (!updatedStudent) {
    throw new httperror(404, "Student does not exist");
  }

  res.status(200).json(updatedStudent);
}

// DELETE eksisterende student
export async function deleteStudent(req, res) {
  const id = req.params.id;
  const deletedCount = await studentsRepository.deleteStudent(id);

  if (deletedCount === 0) {
    throw new httperror(404, "Student does not exist");
  }

  res.sendStatus(204);
}
