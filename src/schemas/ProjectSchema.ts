import ProjectStatusSchema from "@/generated/zod/inputTypeSchemas/ProjectStatusSchema"
import { z } from 'zod'

export const ProjectSchema = z.object({
  id: z.string().nullish(),
  status: ProjectStatusSchema,
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
  clientId: z.string(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema
