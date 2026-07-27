import { z } from 'zod';
import { ProjectCategorySchema } from '../inputTypeSchemas/ProjectCategorySchema'

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  category: ProjectCategorySchema,
  id: z.string(),
  nameAr: z.string(),
  nameEn: z.string(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Service = z.infer<typeof ServiceSchema>

export default ServiceSchema;
