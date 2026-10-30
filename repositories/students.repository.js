// Henter database-forbindelsen fra db.js
import pool from "../database/db.js";

// GET all students
export async function getAllStudents() {
  const result = await pool.query("SELECT * FROM students");
  return result.rows;
}

//GET single student
export async function getStudentById(id) {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  return result.rows[0];
}

// POST lav ny student
export async function createStudent(name, houseId) {
  const result = await pool.query("INSERT INTO students (name, house_id) VALUES ($1, $2) RETURNING *", [name, houseId]); //Returning * gør at databasen sender den nye tilbage
  return result.rows[0];
}

// PUT opdater en eksisterende student
export async function updateStudenr(id, name, houseId) {
  const result = await pool.query("UPDATE students SET name = $1, house_id = $2 WHERE id = $3 RETURNING *", [name, houseId, id]);
  return result.rows[0];
}

// DELETE eksisterende student
export async function deleteStudent(id) {
  const result = await pool.query("DELETE FROM students WHERE id = $1", [id]);
  return result.rowCount;
}
