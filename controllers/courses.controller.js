// Henter de repositories, controlleren skal bruge
import * as coursesRepository from "../repositories/courses.repository.js";
import * as teachersRepository from "../repositories/teachers.repository.js";
import * as studentsRepository from "../repositories/students.repository.js";
import httperror from "../errorhandling/httperror.js";

// GET all courses
export async function getAllCourses(req, res) {
  // try {
  const courses = await coursesRepository.getAllCourses();
  res.status(200).json(courses); // betyder OK
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500); // betyder uforudset fejl på serveren
  // }
}

// GET single course
export async function getCourseById(req, res) {
  // try {
  const id = req.params.id;
  const course = await coursesRepository.getCourseById(id);

  if (course) {
    console.log("Course found:", course);
    res.status(200).json(course); // betyder OK
  }
  throw new httperror(404, "Course does not exist");

  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500); // betyder uforudset fejl på serveren
  // }
}

// POST lav nyt course
// Forventer en body som: { "name": "Defence Against the Dark Arts", "teacher_id": 1 }
export async function createCourse(req, res) {
  // try {
  //   const { name, teacher_id } = req.body;

  if (!name) {
    return res.sendStatus(400).json({ message: "Name is required", error: "Bad request", statusCode: 400 }); // betyder bad request (der mangler data)
  }

  const newCourse = await coursesRepository.createCourse(name, teacher_id);
  res.status(201).json(newCourse); // betyder created
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500).json({ message: "Internal server error", error: "Internal server error", statusCode: 500 }); // betyder uforudset fejl på serveren
  // }
}

// PUT opdater eksisterende course (kun navnet)
// Forventer en body som: { "name": "Advanced Defence Against the Dark Arts" }
export async function updateCourse(req, res) {
  // try {
  const id = req.params.id;
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400); // betyder bad request (der mangler data)
  }

  const updatedCourse = await coursesRepository.updateCourse(id, name);

  if (!updatedCourse) {
    return res.sendStatus(404).json({ message: "Course does not exist", error: "Not found", statusCode: 404 }); // betyder not found
  }

  res.status(200).json(updatedCourse); // betyder OK
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500).json({ message: "Internal server error", error: "Internal server error", statusCode: 500 }); // betyder uforudset fejl på serveren
  // }
}

// DELETE eksisterende course
export async function deleteCourse(req, res) {
  // try {
  const id = req.params.id;
  const deletedCount = await coursesRepository.deleteCourse(id);

  if (deletedCount === 0) {
    return res.sendStatus(404).json({ message: "Course does not exist", error: "Not found", statusCode: 404 }); // betyder not found
  }

  res.sendStatus(204).json({ message: "Course deleted", error: "No content", statusCode: 204 }); // betyder no content
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500).json({ message: "Internal server error", error: "Internal server error", statusCode: 500 }); // betyder uforudset fejl på serveren
  // }
}

// PUT skift teacher
// Forventer en body som: { "teacher_id": 2 }
export async function changeTeacher(req, res) {
  // try {
  const courseId = req.params.id;
  const { teacher_id } = req.body;

  if (!teacher_id) {
    return res.sendStatus(400).json({ message: "Teacher ID is required", error: "Bad request", statusCode: 400 }); // betyder bad request (der mangler data)
  }

  // Tjek at både course og teacher findes
  const course = await coursesRepository.getCourseById(courseId);
  const teacher = await teachersRepository.getTeacherById(teacher_id);

  if (!course || !teacher) {
    return res.sendStatus(404).json({ message: "Course or teacher does not exist", error: "Not found", statusCode: 404 }); // betyder not found
  }

  await coursesRepository.setTeacher(courseId, teacher_id);
  res.sendStatus(200).json({ message: "Teacher updated", error: "OK", statusCode: 200 }); // betyder OK
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500).json({ message: "Internal server error", error: "Internal server error", statusCode: 500 }); // betyder uforudset fejl på serveren
  // }
}

// PUT tilføj student til course
export async function addStudent(req, res) {
  // try {
  const courseId = req.params.id;
  const studentId = req.params.studentId;

  // Tjek at både course og student findes
  const course = await coursesRepository.getCourseById(courseId);
  const student = await studentsRepository.getStudentById(studentId);

  if (!course || !student) {
    return res.sendStatus(404).json({ message: "Course or student does not exist", error: "Not found", statusCode: 404 }); // betyder not found
  }

  await coursesRepository.addStudent(courseId, studentId);
  res.sendStatus(200); // betyder OK
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500).json({ message: "Internal server error", error: "Internal server error", statusCode: 500 }); // betyder uforudset fejl på serveren
  // }
}

// DELETE fjern student fra course
export async function removeStudent(req, res) {
  // try {
  const courseId = req.params.id;
  const studentId = req.params.studentId;

  const removedCount = await coursesRepository.removeStudent(courseId, studentId);

  // Studenten var ikke på courset
  if (removedCount === 0) {
    return res.sendStatus(404).json({ message: "Student not found in course", error: "Not found", statusCode: 404 }); // betyder not found
  }

  res.sendStatus(204); // betyder no content
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500).json({ message: "Internal server error", error: "Internal server error", statusCode: 500 }); // betyder uforudset fejl på serveren
  // }
}
