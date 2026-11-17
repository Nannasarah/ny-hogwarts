// Henter alle funktioner fra teachers-repository'et
import * as teachersRepository from "../repositories/teachers.repository.js";
import httperror from "../errorhandling/httperror.js";
import UpdateTeacherDto from "../dtos/updateteacher.dto.js";

// Fejl bliver "thrown" som httperror og fanget af errorhandleren (errorhandler.js),
// så der er ikke brug for try-catch her.

// GET all teachers
export async function getAllTeachers(req, res) {
  const teachers = await teachersRepository.getAllTeachers();
  res.status(200).json(teachers); // 200 = OK
}

// GET single teacher
export async function getTeacherById(req, res) {
  const id = req.params.id;
  const teacher = await teachersRepository.getById(id);

  // Findes ikke → 404 Not Found.
  // Vi tjekker for fejlen FØRST, så throw ikke kører efter at svaret allerede er sendt
  if (!teacher) {
    throw new httperror(404, "Teacher does not exist");
  }

  res.status(200).json(teacher); // 200 = OK
}

// POST lav en ny teacher
// Forventer en body som: { "name": "Peter", "house_id": 1 }
export async function createTeacher(req, res) {
  const { name, house_id } = req.body;

  // Mangler name → 400 Bad Request
  if (!name) {
    throw new httperror(400, "Name is required");
  }

  const newTeacher = await teachersRepository.createTeacher(name, house_id);
  res.status(201).json(newTeacher); // 201 = Created
}

// PUT opdater en eksisterende teacher
// Forventer en body som: { "id": 1, "name": "Peter", "house_id": 1 }
export async function updateTeacher(req, res) {
  const id = req.params.id;
  const input = req.body;

  // safeParse tjekker bodyen med DTO'en, men kaster IKKE en fejl selv.
  // Den giver et resultat tilbage: result.success er true/false, og result.data er de godkendte data.
  // (parse ville kaste en ZodError, som ikke har en statusCode → errorhandleren ville sende 500)
  const result = UpdateTeacherDto.safeParse(input);

  // Forkerte data (fx house_id er "3" i stedet for 3, eller name mangler) → 400 Bad Request
  if (!result.success) {
    throw new httperror(400, "Invalid teacher data");
  }

  const newTeacherData = result.data;
  const updatedTeacher = await teachersRepository.updateTeacher(id, newTeacherData);

  // Findes ikke → 404 Not Found
  if (!updatedTeacher) {
    throw new httperror(404, "Teacher does not exist");
  }

  res.status(200).json(updatedTeacher); // 200 = OK
}

// DELETE eksisterende teacher
export async function deleteTeacher(req, res) {
  const id = req.params.id;
  const deletedCount = await teachersRepository.deleteTeacher(id);

  // Intet blev slettet → 404 Not Found
  if (deletedCount === 0) {
    throw new httperror(404, "Teacher does not exist");
  }

  // Slettet → 204 No Content (der sendes ikke noget tilbage)
  res.sendStatus(204);
}
