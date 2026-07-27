import { z } from 'zod'

export const ProjectServiceSchema = z.object({
  projectId: z.string(),
  serviceId: z.string(),
})

export type ProjectService = z.infer<typeof ProjectServiceSchema>

export default ProjectServiceSchema
