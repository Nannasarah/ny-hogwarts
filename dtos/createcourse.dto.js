import * as z from "zod";

// DTO Beskriver hvordan bodyen skal se ud, når man opretter et nyt course. her forventer vi: { "name": "Defence Against the Dark Arts", "teacher_id": 1 }
const CreateCourseDto = z.object({
  name: z.string().min(1),
  teacher_id: z.int().optional(), //hvis der ikke sættes en lærer ind med det samme er den NULL
});

export default CreateCourseDto;
