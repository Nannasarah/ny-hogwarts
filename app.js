import housesRouter from "./routes/houses.routes.js";
import teachersRouter from "./routes/teachers.routes.js";
import studentsRouter from "./routes/students.routes.js";
import coursesRouter from "./routes/courses.routes.js";
import "dotenv/config"; //læser env filen.
import express from "express";

// Opretter selve Express-app
const app = express();

// Gør at Express kan læse JSON
app.use(express.json());

app.use("/houses", housesRouter);
app.use("/teachers", teachersRouter);
app.use("/students", studentsRouter);
app.use("/courses", coursesRouter);

// Starter serveren på porten fra .env (3000)
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server kører på http://localhost:${port}`);
});
