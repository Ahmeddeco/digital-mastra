import { z } from 'zod';

export const ProjectScalarFieldEnumSchema = z.enum(['id','code','titleAr','titleEn','descriptionAr','descriptionEn','clientId','status','startDate','endDate','metadata','isArchived','deletedAt','createdAt','updatedAt','category']);

export default ProjectScalarFieldEnumSchema;
