// Henter alle funktioner fra students-repository'et
import * as studentsRepository from "../repositories/students.repository.js";
import httperror from "../errorhandling/httperror.js";

// Fejl bliver "thrown" som httperror og fanget af errorhandleren (errorhandler.js),
// så der er ikke brug for try-catch her.

// GET all students
export async function getAllStudents(req, res) {
  const students = await studentsRepository.getAllStudents();
  res.status(200).json(students); // 200 = OK
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

  res.status(200).json(student); // 200 = OK
}

// POST lav en ny student
// Forventer en body ser sådan ud: { "name": "Nanna Pedersen", "house_id": 1 }
export async function createStudent(req, res) {
  const { name, house_id } = req.body;

  // Mangler name → 400 Bad Request
  if (!name) {
    throw new httperror(400, "Name is required");
  }

  const newStudent = await studentsRepository.createStudent(name, house_id);
  res.status(201).json(newStudent); // 201 = Created
}

// PUT opdater eksisterende student
// Forventer en body ved test der ser sådan ud: { "name": "Nanna Pedersen", "house_id": 1 }
export async function updateStudent(req, res) {
  const id = req.params.id;
  const { name, house_id } = req.body;

  // Mangler name → 400 Bad Request
  if (!name) {
    throw new httperror(400, "Name is required");
  }

  const updatedStudent = await studentsRepository.updateStudent(id, name, house_id);

  // Findes ikke → 404 Not Found
  if (!updatedStudent) {
    throw new httperror(404, "Student does not exist");
  }

  res.status(200).json(updatedStudent); // 200 = OK
}

// DELETE eksisterende student
export async function deleteStudent(req, res) {
  const id = req.params.id;
  const deletedCount = await studentsRepository.deleteStudent(id);

  // Intet blev slettet → 404 Not Found
  if (deletedCount === 0) {
    throw new httperror(404, "Student does not exist");
  }

  // Slettet → 204 No Content (der sendes ikke noget tilbage)
  res.sendStatus(204);
}
