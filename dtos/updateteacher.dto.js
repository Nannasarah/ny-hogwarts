import * as z from "zod";
const UpdateTeacherDto = z.object({
  id: z.int().min(0),
  name: z.string(),
  house_id: z.int(),
});

export default UpdateTeacherDto;
