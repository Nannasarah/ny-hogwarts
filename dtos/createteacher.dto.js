import * as z from "zod";

const CreateTeacherDto = z.object({
  name: z.string().min(1),
  house_id: z.int(),
});

export default CreateTeacherDto;
