// Henter alle funktioner fra teachers-repository'et
import * as teachersRepository from "../repositories/teachers.repository.js";
import httperror from "../errorhandling/httperror.js";
import UpdateTeacherDto from "../dtos/updateteacher.dto.js";
import CreateTeacherDto from "../dtos/createteacher.dto.js";

// GET all teachers
export async function getAllTeachers(req, res) {
  const teachers = await teachersRepository.getAllTeachers();
  res.status(200).json(teachers);
}

// GET single teacher
export async function getTeacherById(req, res) {
  const id = req.params.id;
  const teacher = await teachersRepository.getById(id);

  // Vi tjekker for fejlen FØRST, så throw ikke kører efter at svaret allerede er sendt
  if (!teacher) {
    throw new httperror(404, "Teacher does not exist");
  }

  res.status(200).json(teacher);
}

// POST lav en ny teacher
export async function createTeacher(req, res) {
  const data = req.body;

  // zod tjekker objektet. Er data forkerte (fx name mangler), kaster parse en ZodError,
  const teacher = CreateTeacherDto.parse(data);

  const newTeacher = await teachersRepository.createTeacher(teacher);
  res.status(201).json(newTeacher);
}

// PUT opdater en eksisterende teacher
export async function updateTeacher(req, res) {
  const id = req.params.id;
  const data = req.body;
  const teacher = UpdateTeacherDto.parse(data);
  const updatedTeacher = await teachersRepository.updateTeacher(id, teacher);

  if (!updatedTeacher) {
    throw new httperror(404, "Teacher does not exist");
  }

  res.status(200).json(updatedTeacher);
}

// DELETE eksisterende teacher
export async function deleteTeacher(req, res) {
  const id = req.params.id;
  const deletedCount = await teachersRepository.deleteTeacher(id);

  if (deletedCount === 0) {
    throw new httperror(404, "Teacher does not exist");
  }

  res.sendStatus(204);
}
