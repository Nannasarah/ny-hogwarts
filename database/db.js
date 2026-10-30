import pg from "pg"; // Henter pg-pakken, efter jeg har installeret: npm install pg
import "dotenv/config";

// Opretter en "pool" – en samling af forbindelser til databasen
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;
