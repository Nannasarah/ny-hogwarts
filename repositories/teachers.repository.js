// Henter database-forbindelsen fra db.js
import pool from "../database/db.js";

// ---GET all teachers--
export async function getAllTeachers() {
  const result = await pool.query(/*sql*/ `SELECT teachers.id, 
                                  teachers.name, 
                                  houses.name AS house FROM public.teachers
                                  JOIN houses   
                                  ON teachers.house_id = houses.id`);
  return result.rows;
}

// GET single teacher
export async function getById(id) {
  const result = await pool.query(
    /*sql*/ `SELECT teachers.id, teachers.name, houses.name AS house 
                                FROM public.teachers
                                 JOIN houses ON teachers.house_id = houses.id
                                WHERE teachers.id = $1`,
    [id],
  );
  return result.rows[0];
}

// POST create new teacher
export async function createTeacher(teacher) {
  const result = await pool.query(
    /*sql*/ `INSERT INTO teachers (name, house_id)
             VALUES ($1, $2) RETURNING *`,
    [teacher.name, teacher.house_id],
  );

  return result.rows[0];
}

// PUT opdater en eksisterende lærer
export async function updateTeacher(id, teacher) {
  const result = await pool.query("UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING id", [teacher.name, teacher.house_id, id]);
  if (result.rowCount === 0) {
    return null; // Returner null, hvis ingen rækker blev opdateret
  }
  const updateId = result.rows[0].id;

  return getById(updateId);
}

// DELETE eksisterende lærer
export async function deleteTeacher(id) {
  const result = await pool.query("DELETE FROM teachers WHERE id = $1", [id]);
  return result.rowCount;
}
