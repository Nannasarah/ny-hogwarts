// Henter database-forbindelsen fra db.js
import pool from "../database/db.js";

// GET all courses

export async function getAllCourses() {
  const result = await pool.query("SELECT * FROM courses"); // sql. Henter alle rækker fra courses-tabellen
  return result.rows;
}

// GET single course
export async function getCourseById(id) {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]); // Henter det course, hvor id passer. og $1 er pladsholder.
  return result.rows[0]; //0 er det første element i arrayet.
}

// POST lav ny course
export async function createCourse(name, teacherId) {
  const result = await pool.query("INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *", [name, teacherId]); // Indsætter en ny række i courses-tabellen og RETURNING * sender den nye række tilbage, så vi kan se det nye id
  return result.rows[0];
}

// PUT opdater eksisterende course (kun navnet)
export async function updateCourse(id, name) {
  const result = await pool.query("UPDATE courses SET name = $1 WHERE id = $2 RETURNING *", [name, id]);
  return result.rows[0];
}

// DELETE eksisterende course
// Sletter det course, hvor id passer
export async function deleteCourse(id) {
  const result = await pool.query("DELETE FROM courses WHERE id = $1", [id]); // rowCount fortæller hvor mange rækker der blev slettet (1 = slettet, 0 = fandtes ikke)
  return result.rowCount;
}

// PUT skift teacher
export async function setTeacher(courseId, teacherId) {
  await pool.query("UPDATE courses SET teacher_id = $1 WHERE id = $2", [teacherId, courseId]); // SET teacher_id = $1 = ændrer id til det nye id og WHERE id = $2 betyder kun på det course, hvor id passer
}

// PUT tilføj student til course

export async function addStudent(courseId, studentId) {
  await pool.query("INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [courseId, studentId]); // Indsætter en ny række i koblingstabellen course_students (course-id + student-id) og hvis eleven allerede er på courset sker der ingenting.
}

// DELETE fjern student fra course
export async function removeStudent(courseId, studentId) {
  const result = await pool.query("DELETE FROM course_students WHERE course_id = $1 AND student_id = $2", [courseId, studentId]);
  return result.rowCount;
}
