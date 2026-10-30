# Pseudokode for endpoints

Her er en beskrivelse af hvad der sker i hvert endpoint. Mange endpoints fungerer på samme måde, så nogle steder har jeg kun beskrevet en gang.

## GET /houses

- Hent alle houses fra databasen
- Send listen tilbage med status 200

GET /teachers, GET /students og GET /courses fungerer på samme måde.

## GET /houses/:id

- Læs id fra URL'en
- Hent det house fra databasen, der har det id
- Hvis der ikke findes et house med det id: send status 404
- Ellers: send houset tilbage med status 200

GET /teachers/:id, GET /students/:id og GET /courses/:id fungerer på samme måde.

## POST /teachers – opret

- Læs name og house_id fra body
- Hvis name mangler: send status 400
- Gem den nye teacher i databasen
- Send den nye teacher (med det nye id) tilbage med status 201

POST /students fungerer på samme måde.
POST /courses fungerer på samme måde, men med name og teacher_id.

## PUT /teachers/:id – opdatér

- Læs id fra URL'en
- Læs name og house_id fra body
- Hvis name mangler: send status 400
- Opdatér teacheren med det id i databasen
- Hvis der ikke fandtes en teacher med det id: send status 404
- Ellers: send den opdaterede teacher tilbage med status 200

PUT /students/:id fungerer på samme måde.
PUT /courses/:id fungerer på samme måde, men ændrer kun name.

## DELETE /teachers/:id – slet

- Læs id fra URL'en
- Slet teacheren med det id fra databasen
- Hvis der ikke blev slettet noget: send status 404
- Ellers: send status 204 (intet indhold)
- De courses, teacheren havde, står bagefter uden teacher

DELETE /students/:id fungerer på samme måde. Studenten bliver også fjernet fra sine courses.
DELETE /courses/:id fungerer på samme måde. Koblingerne til courseets students bliver også slettet.

## PUT /courses/:id/teacher – skift

- Læs course-id fra URL'en
- Læs teacher_id fra body
- Hvis teacher_id mangler: send status 400
- Find courset og teacheren i databasen for at se, om de findes
- Hvis en af dem ikke findes: send status 404
- Sæt courseets teacher til den nye teacher
- Send status 200

## PUT /courses/:id/students/:studentId – tilføj en student til et course

- Læs course-id og student-id fra URL'en
- Find courset og studenten i databasen for at se, om de findes
- Hvis en af dem ikke findes: send status 404
- Tilføj studenten til courset (hvis studenten allerede er på courset, sker der ingenting)
- Send status 200

## DELETE /courses/:id/students/:studentId – fjern en student fra et course

- Læs course-id og student-id fra URL'en
- Fjern studenten fra courset i databasen
- Hvis studenten ikke var på courset: send status 404
- Ellers: send status 204 (intet indhold)

## Uforudsete fejl

Alle endpoints sender status 500, hvis der sker en uforudset fejl, det kan være at databasen ikke svarer.
