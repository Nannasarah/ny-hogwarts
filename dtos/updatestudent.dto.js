import * as z from "zod";

const UpdateStudentDto = z.object({
  name: z.string().min(1),
  house_id: z.int(),
});

export default UpdateStudentDto;
