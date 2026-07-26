import { z } from 'zod';
import { ProjectCategorySchema } from '../inputTypeSchemas/ProjectCategorySchema'

/////////////////////////////////////////
// PROJECT TYPE SCHEMA
/////////////////////////////////////////

export const ProjectTypeSchema = z.object({
  category: ProjectCategorySchema,
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ProjectType = z.infer<typeof ProjectTypeSchema>

export default ProjectTypeSchema;
