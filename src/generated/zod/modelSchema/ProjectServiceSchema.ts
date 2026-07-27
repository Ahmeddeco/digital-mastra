import { z } from 'zod';

/////////////////////////////////////////
// PROJECT SERVICE SCHEMA
/////////////////////////////////////////

export const ProjectServiceSchema = z.object({
  projectId: z.string(),
  serviceId: z.string(),
})

export type ProjectService = z.infer<typeof ProjectServiceSchema>

export default ProjectServiceSchema;
