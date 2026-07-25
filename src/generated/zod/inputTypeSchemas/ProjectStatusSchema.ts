import { z } from 'zod';

export const ProjectStatusSchema = z.enum(['draft','onboarding','inProgress','inReview','onHold','blocked','completed','cancelled','maintenance']);

export type ProjectStatusType = `${z.infer<typeof ProjectStatusSchema>}`

export default ProjectStatusSchema;
