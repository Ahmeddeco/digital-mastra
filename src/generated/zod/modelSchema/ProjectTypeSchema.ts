import { z } from 'zod';

/////////////////////////////////////////
// PROJECT TYPE SCHEMA
/////////////////////////////////////////

export const ProjectTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ProjectType = z.infer<typeof ProjectTypeSchema>

export default ProjectTypeSchema;
