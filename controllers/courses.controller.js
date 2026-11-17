// Henter de repositories, controlleren skal bruge
import * as coursesRepository from "../repositories/courses.repository.js";
import * as teachersRepository from "../repositories/teachers.repository.js";
import * as studentsRepository from "../repositories/students.repository.js";
import httperror from "../errorhandling/httperror.js";

// Sådan virker fejlhåndteringen nu:
// - Går alt godt, sender vi selv svaret med res.status(...).json(...) eller res.sendStatus(...)
// - Går noget galt, "thrower" vi en httperror med status og besked.
//   Express fanger den automatisk og sender den videre til errorhandleren (errorhandler.js),
//   som laver JSON-svaret. Derfor behøver vi ingen try-catch her.

// GET all courses
export async function getAllCourses(req, res) {
  const courses = await coursesRepository.getAllCourses();
  res.status(200).json(courses); // 200 = OK
}

// GET single course
export async function getCourseById(req, res) {
  const id = req.params.id;
  const course = await coursesRepository.getCourseById(id);

  // Findes ikke → 404. throw stopper funktionen og sender fejlen til errorhandleren
  if (!course) {
    throw new httperror(404, "Course does not exist");
  }

  res.status(200).json(course); // 200 = OK
}

// POST lav nyt course
// Forventer en body som: { "name": "Defence Against the Dark Arts", "teacher_id": 1 }
export async function createCourse(req, res) {
  const { name, teacher_id } = req.body;

  // Mangler name → 400 Bad Request
  if (!name) {
    throw new httperror(400, "Name is required");
  }

  const newCourse = await coursesRepository.createCourse(name, teacher_id);
  res.status(201).json(newCourse); // 201 = Created
}

// PUT opdater eksisterende course (kun navnet)
// Forventer en body som: { "name": "Advanced Defence Against the Dark Arts" }
export async function updateCourse(req, res) {
  const id = req.params.id;
  const { name } = req.body;

  // Mangler name → 400 Bad Request
  if (!name) {
    throw new httperror(400, "Name is required");
  }

  const updatedCourse = await coursesRepository.updateCourse(id, name);

  // Intet course med det id → 404 Not Found
  if (!updatedCourse) {
    throw new httperror(404, "Course does not exist");
  }

  res.status(200).json(updatedCourse); // 200 = OK
}

// DELETE eksisterende course
export async function deleteCourse(req, res) {
  const id = req.params.id;
  const deletedCount = await coursesRepository.deleteCourse(id);

  // Intet blev slettet → 404 Not Found
  if (deletedCount === 0) {
    throw new httperror(404, "Course does not exist");
  }

  // 204 = No Content. Der må ikke sendes en body med 204, derfor kun sendStatus (uden .json)
  res.sendStatus(204);
}

// PUT skift teacher
// Forventer en body som: { "teacher_id": 2 }
export async function changeTeacher(req, res) {
  const courseId = req.params.id;
  const { teacher_id } = req.body;

  // Mangler teacher_id → 400 Bad Request
  if (!teacher_id) {
    throw new httperror(400, "Teacher ID is required");
  }

  // Tjek at både course og teacher findes
  const course = await coursesRepository.getCourseById(courseId);
  const teacher = await teachersRepository.getById(teacher_id);

  // En af dem findes ikke → 404 Not Found
  if (!course || !teacher) {
    throw new httperror(404, "Course or teacher does not exist");
  }

  await coursesRepository.setTeacher(courseId, teacher_id);

  // res.status(200).json(...) i stedet for sendStatus(200).json(...),
  // fordi sendStatus sender svaret med det samme, så .json bagefter ville fejle
  res.status(200).json({ message: "Teacher updated" }); // 200 = OK
}

// PUT tilføj student til course
export async function addStudent(req, res) {
  const courseId = req.params.id;
  const studentId = req.params.studentId;

  // Tjek at både course og student findes
  const course = await coursesRepository.getCourseById(courseId);
  const student = await studentsRepository.getStudentById(studentId);

  // En af dem findes ikke → 404 Not Found
  if (!course || !student) {
    throw new httperror(404, "Course or student does not exist");
  }

  await coursesRepository.addStudent(courseId, studentId);
  res.sendStatus(200); // 200 = OK
}

// DELETE fjern student fra course
export async function removeStudent(req, res) {
  const courseId = req.params.id;
  const studentId = req.params.studentId;

  const removedCount = await coursesRepository.removeStudent(courseId, studentId);

  // Studenten var ikke på courset → 404 Not Found
  if (removedCount === 0) {
    throw new httperror(404, "Student not found in course");
  }

  res.sendStatus(204); // 204 = No Content
}
