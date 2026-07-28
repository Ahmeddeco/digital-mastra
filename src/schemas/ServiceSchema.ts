import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"
import { z } from 'zod'

export const ServiceSchema = z.object({
  id: z.string().nullish(),
  nameAr: z.string(),
  nameEn: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  category: ProjectCategorySchema,
})

export type Service = z.infer<typeof ServiceSchema>

export default ServiceSchema
