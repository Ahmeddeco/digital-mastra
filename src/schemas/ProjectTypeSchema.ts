import { z } from 'zod'

export const ProjectTypeSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
})

export type ProjectType = z.infer<typeof ProjectTypeSchema>

export default ProjectTypeSchema
