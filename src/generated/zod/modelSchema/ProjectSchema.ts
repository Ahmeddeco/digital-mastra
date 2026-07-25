import { z } from 'zod';
import { ProjectStatusSchema } from '../inputTypeSchemas/ProjectStatusSchema'

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  status: ProjectStatusSchema,
  id: z.string(),
  slug: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  painPointsAr: z.string().nullish(),
  painPointsEn: z.string().nullish(),
  solutionsAr: z.string().nullish(),
  solutionsEn: z.string().nullish(),
  mainImage: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  clientId: z.string(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema;
