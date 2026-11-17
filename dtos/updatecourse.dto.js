import * as z from "zod";

const UpdateCourseDto = z.object({
  name: z.string().min(1),
});

export default UpdateCourseDto;
