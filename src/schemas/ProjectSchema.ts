import JsonValueSchema from "@/generated/zod/inputTypeSchemas/JsonValueSchema"
import ProjectStatusSchema from "@/generated/zod/inputTypeSchemas/ProjectStatusSchema"
import { z } from 'zod'

export const ProjectSchema = z.object({
  status: ProjectStatusSchema,
  id: z.string().nullish(),
  code: z.string().nullish(),
  title: z.string(),
  description: z.string().nullish(),
  clientId: z.string(),
  startDate: z.date().nullish(),
  endDate: z.date().nullish(),
  metadata: JsonValueSchema.nullable(),
  isArchived: z.boolean().nullish(),
  deletedAt: z.date().nullish(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema
