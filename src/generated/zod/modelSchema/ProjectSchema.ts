import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { ProjectStatusSchema } from '../inputTypeSchemas/ProjectStatusSchema'

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  status: ProjectStatusSchema,
  id: z.string(),
  code: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  clientId: z.string(),
  startDate: z.date().nullish(),
  endDate: z.date().nullish(),
  metadata: JsonValueSchema.nullable(),
  isArchived: z.boolean().nullish(),
  deletedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema;
