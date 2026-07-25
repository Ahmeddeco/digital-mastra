import { z } from 'zod';

export const ProjectScalarFieldEnumSchema = z.enum(['id','slug','titleAr','titleEn','descriptionAr','descriptionEn','painPointsAr','painPointsEn','solutionsAr','solutionsEn','mainImage','images','status','createdAt','updatedAt','clientId']);

export default ProjectScalarFieldEnumSchema;
