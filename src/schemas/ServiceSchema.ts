import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"
import { z } from 'zod'

export const ServiceSchema = z.object({
  category: ProjectCategorySchema,
  id: z.string().nullish(),
  nameAr: z.string(),
  nameEn: z.string(),
  description: z.string().nullish(),
})

export type Service = z.infer<typeof ServiceSchema>

export default ServiceSchema
