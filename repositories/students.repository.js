// Henter database-forbindelsen fra db.js
import pool from "../database/db.js";

// GET all students
export async function getAllStudents() {
  const result = await pool.query(/*sql*/ `SELECT * FROM students`);
  return result.rows;
}

//GET single student
export async function getStudentById(id) {
  const result = await pool.query(
    /*sql*/ `SELECT * FROM students 
            WHERE id = $1`,
    [id],
  );
  return result.rows[0];
}

// POST lav ny student
export async function createStudent(student) {
  const result = await pool.query(
    /*sql*/ `INSERT INTO students (name, house_id) 
            VALUES ($1, $2) RETURNING *`,
    [student.name, student.house_id],
  ); //Returning * gør at databasen sender den nye tilbage
  return result.rows[0];
}

// PUT opdater en eksisterende student
export async function updateStudent(id, student) {
  const result = await pool.query(
    /*sql*/ `UPDATE students 
          SET name = $1, house_id = $2 
          WHERE id = $3 RETURNING *`,
    [student.name, student.house_id, id],
  );
  return result.rows[0];
}

// DELETE eksisterende student
export async function deleteStudent(id) {
  const result = await pool.query(
    /*sql*/ `DELETE FROM students 
              WHERE id = $1`,
    [id],
  );
  return result.rowCount;
}
