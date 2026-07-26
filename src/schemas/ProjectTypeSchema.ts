import ProjectCategorySchema from "@/generated/zod/inputTypeSchemas/ProjectCategorySchema"
import { z } from 'zod'

export const ProjectTypeSchema = z.object({
  id: z.string().nullish(),
  category: ProjectCategorySchema,
  title: z.string(),
})

export type ProjectType = z.infer<typeof ProjectTypeSchema>

export default ProjectTypeSchema
