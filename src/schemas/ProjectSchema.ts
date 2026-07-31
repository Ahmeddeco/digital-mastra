import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"
import ProjectStatusSchema from "@/generated/zod/inputTypeSchemas/ProjectStatusSchema"
import { z } from 'zod'

export const ProjectSchema = z.object({
  status: ProjectStatusSchema,
  category: ProjectCategorySchema,
  id: z.string().nullish(),
  code: z.string().nullish(),// This will be added by database
  titleAr: z.string(),
  titleEn: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  clientId: z.string(),
  startDate: z.date().nullish(),
  endDate: z.date().nullish(),
  isArchived: z.boolean().nullish(),
  deletedAt: z.date().nullish(),
  // تحويل النص تلقائيًا إلى Array of Strings
  services: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val)
      } catch {
        return [val]
      }
    }
    return val
  }, z.array(z.string())),
  metadata: z
    .array(
      z.object({ key: z.string(), value: z.string(), })
    ).nullable(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema
