import * as z from "zod";

const CreateStudentDto = z.object({
  name: z.string().min(1),
  house_id: z.int(),
});

export default CreateStudentDto;
