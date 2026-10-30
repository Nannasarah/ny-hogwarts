// Henter alle funktioner fra students-repository'et
import * as studentsRepository from "../repositories/students.repository.js";

// GET all students
export async function getAllStudents(req, res) {
  try {
    const students = await studentsRepository.getAllStudents();
    res.status(200).json(students); // betyder OK
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // betyder uforudset fejl på serveren
  }
}

// GET single student
export async function getStudentById(req, res) {
  try {
    const id = req.params.id;
    const student = await studentsRepository.getStudentById(id);

    // Findes ikke → 404 Not Found
    if (!student) {
      return res.sendStatus(404); // betyder not found
    }

    res.status(200).json(student); // betyder OK
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // betyder uforudset fejl på serveren
  }
}

// POST lav en ny student
// Forventer en body ser sådan ud: { "name": "Nanna Pedersen", "house_id": 1 }
export async function createStudent(req, res) {
  try {
    const { name, house_id } = req.body;

    // Mangler name → 400 Bad Request
    if (!name) {
      return res.sendStatus(400); // betyder bad request (der mangler data)
    }

    const newStudent = await studentsRepository.createStudent(name, house_id);

    // Oprettet → 201 Created
    res.status(201).json(newStudent); // betyder created
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // betyder uforudset fejl på serveren
  }
}

// PUT opdater eksisterende student
// Forventer en body ved test der ser sådan ud: { "name": "Nanna Pedersen", "house_id": 1 }
export async function updateStudent(req, res) {
  try {
    const id = req.params.id;
    const { name, house_id } = req.body;

    // Mangler name → 400 Bad Request
    if (!name) {
      return res.sendStatus(400); // betyder bad request (der mangler data)
    }

    const updatedStudent = await studentsRepository.updateStudent(id, name, house_id);

    // Findes ikke → 404 Not Found
    if (!updatedStudent) {
      return res.sendStatus(404); // betyder not found
    }

    res.status(200).json(updatedStudent); // betyder OK
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // betyder uforudset fejl på serveren
  }
}

// DELETE eksisterende student
export async function deleteStudent(req, res) {
  try {
    const id = req.params.id;
    const deletedCount = await studentsRepository.deleteStudent(id);

    // Intet blev slettet → 404 Not Found
    if (deletedCount === 0) {
      return res.sendStatus(404); // betyder not found
    }

    // Slettet → 204 No Content (der sendes ikke noget tilbage)
    res.sendStatus(204); // betyder no content
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // betyder uforudset fejl på serveren
  }
}
