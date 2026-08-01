import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"
import { z } from 'zod'

export const DemoSchema = z.object({
  category: ProjectCategorySchema,
  id: z.string().nullish(),
  slug: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  painPointsAr: z.string().nullish(),
  painPointsEn: z.string().nullish(),
  solutionsAr: z.string().nullish(),
  solutionsEn: z.string().nullish(),
  mainImage: z.string().url(),
  images: z.string().url().array(),
  liveUrl: z.string().url().nullish(),
  deletedAt: z.date().nullish(),
  projectId: z.string().nullish(),
})

export type Demo = z.infer<typeof DemoSchema>

export default DemoSchema
