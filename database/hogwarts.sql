-- Hogwarts Course Management System – database
-- Kør hele filen i pgAdmin (Query Tool) for at oprette alle tabeller med eksempel-data

-- Slet gamle tabeller (så filen kan køres igen og igen)
DROP TABLE IF EXISTS course_students;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS houses;

-- HOUSES
CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- TEACHERS – hver teacher hører til et house
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house_id INTEGER REFERENCES houses(id)
);

-- STUDENTS – hver student hører til et house
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house_id INTEGER REFERENCES houses(id)
);

-- COURSES – hvert course har en teacher
-- Hvis en teacher slettes, bliver teacher_id sat til NULL så courset ikke forsvinder
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL
);

-- COURSE_STUDENTS – koblingstabel (mange-til-mange)
-- Hver række betyder: "denne student går på dette course". Hvis et course eller en student slettes, forsvinder forbindelsen også
CREATE TABLE course_students (
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);


-- EKSEMPEL-DATA

-- Houses (id 1-4)
INSERT INTO houses (name) VALUES
  ('Gryffindor'),
  ('Hufflepuff'),
  ('Ravenclaw'),
  ('Slytherin');

-- Teachers (id 1-4)
INSERT INTO teachers (name, house_id) VALUES
  ('Minerva McGonagall', 1),
  ('Pomona Sprout', 2),
  ('Filius Flitwick', 3),
  ('Severus Snape', 4);

-- Students (id 1-6)
INSERT INTO students (name, house_id) VALUES
  ('Harry Potter', 1),
  ('Hermione Granger', 1),
  ('Ron Weasley', 1),
  ('Cedric Diggory', 2),
  ('Luna Lovegood', 3),
  ('Draco Malfoy', 4);

-- Courses (id 1-4)
INSERT INTO courses (name, teacher_id) VALUES
  ('Database', 1),
  ('Backend', 2),
  ('Frontend', 3),
  ('Ux-design', 4);

-- Hvilke students går på hvilke courses
INSERT INTO course_students (course_id, student_id) VALUES
  (1, 1), (1, 2), (1, 3),          -- Database: Harry, Hermione, Ron
  (2, 2), (2, 4),                  -- Backend: Hermione, Cedric
  (3, 2), (3, 5),                  -- Frontend: Hermione, Luna
  (4, 1), (4, 3), (4, 6);          -- Ux-design: Harry, Ron, Draco