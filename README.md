## Hejsa Peter

her er alt hvad du skal vide, inden du dykker ned i opgaven.

## OPSÆTNING

1. Først skal du installere pakker: npm install
2. Opret en database i PostgreSQL.
3. Åbn database/hogwarts.sql i pgAdmin og kør hele filen. Den opretter alle tabeller med eksempel-data.
4. Kopiér .env.example til en ny fil, du kalder .env, og udfyld den med dine egne database-oplysninger.
5. Start serveren: npm run dev
   Serveren kører på `http://localhost:3000`

## ENDPOINTS

### Houses

- GET /houses – hent alle
- GET /houses/:id – hent ét bestemt

### Teachers

- GET /teachers – hent alle
- GET /teachers/:id – hent én bestemt
- POST /teachers – opret
- PUT /teachers/:id – opdater
- DELETE /teachers/:id – slet

### Students

- GET /students – hent alle
- GET /students/:id – hent én bestemt
- POST /students – opret ny
- PUT /students/:id – opdatér
- DELETE /students/:id – slet

### Courses

- GET /courses – hent alle
- GET /courses/:id – hent ét bestemt
- POST /courses – opret
- PUT /courses/:id – opdater
- DELETE /courses/:id – slet
- PUT /courses/:id/teacher – skift teacher på et course
- PUT /courses/:id/students/:studentId – tilføj
- DELETE /courses/:id/students/:studentId – fjern

## TEST I BRUNO

Testene ligger i mappen hogwarts-api-test.

1. Start serveren med npm run dev.
2. Åbn mappen hogwarts-api-test i Bruno og kør testene.

## MAPPESTRUKTUR

- database – forbindelsen til databasen (db.js) og SQL-filen
- routes – bestemmer method og route for hvert endpoint
- controllers – håndterer request og response og vælger statuskoder
- repositories – det eneste sted med SQL
