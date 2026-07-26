import { z } from 'zod';

export const ProjectCategorySchema = z.enum(['development','marketing','design']);

export type ProjectCategoryType = `${z.infer<typeof ProjectCategorySchema>}`

export default ProjectCategorySchema;
