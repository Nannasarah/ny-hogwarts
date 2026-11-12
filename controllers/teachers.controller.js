// Henter alle funktioner fra teachers-repository'et
import * as teachersRepository from "../repositories/teachers.repository.js";
import httperror from "../errorhandling/httperror.js";
import UpdateTeacherDto from "../dtos/updateteacher.dto.js";

// GET all teachers
export async function getAllTeachers(req, res) {
  // try {
  const teachers = await teachersRepository.getAllTeachers();
  res.status(200).json(teachers); // betyder OK
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500); // betyder uforudset fejl på serveren
  // }
}

// GET single teacher
export async function getTeacherById(req, res) {
  // try {
  const id = req.params.id;
  const teacher = await teachersRepository.getById(id);

  // Findes ikke, 404 Not Found
  if (teacher) {
    console.log("Teacher found:", teacher);
    res.status(200).json(teacher); // betyder OK
  }

  throw new httperror(404, "Teacher does not exist");
  //return res.sendStatus(404); // betyder not found
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500); // betyder uforudset fejl på serveren
  // }
}

// POST lav en ny teacher
// Forventer en body som: { "name": "Peter", "house_id": 1 }
export async function createTeacher(req, res) {
  // try {
  const { name, house_id } = req.body;

  // Mangler name → 400 Bad Request
  if (!name) {
    return res.sendStatus(400); // betyder bad request (der mangler data)
  }

  const newTeacher = await teachersRepository.createTeacher(name, house_id);

  // Oprettet → 201 Created
  res.status(201).json(newTeacher); // betyder created
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500); // betyder uforudset fejl på serveren
  // }
}

// PUT opdater en eksisterende teacher
// Forventer en body som: { "name": "Peter", "house_id": 1 }
export async function updateTeacher(req, res) {
  // try {
  const id = req.params.id;
  const input = req.body;

  const newTeacherData = UpdateTeacherDto.parse(input);
  const updatedTeacher = await teachersRepository.updateTeacher(id, newTeacherData);

  // Findes ikke → 404 Not Found
  if (!updatedTeacher) {
    return res.sendStatus(404); // betyder not found
  }

  res.status(200).json(updatedTeacher); // betyder OK
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500); // betyder uforudset fejl på serveren
  // }
}

// DELETE eksisterende teacher
export async function deleteTeacher(req, res) {
  // try {
  const id = req.params.id;
  const deletedCount = await teachersRepository.deleteTeacher(id);

  // Intet blev slettet → 404 Not Found
  if (deletedCount === 0) {
    return res.sendStatus(404); // betyder not found
  }

  // Slettet → 204 No Content (der sendes ikke noget tilbage)
  res.sendStatus(204); // betyder no content
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500); // betyder uforudset fejl på serveren
  // }
}
