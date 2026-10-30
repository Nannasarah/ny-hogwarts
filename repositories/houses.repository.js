import pool from "../database/db.js";

//GET all houses
export async function getAllHouses() {
  const result = await pool.query("SELECT * FROM houses");
  return result.rows;
}

//GET single house
export async function getHouseById(id) {
  const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
  return result.rows[0];
}
