import { z } from 'zod';

export const DemoScalarFieldEnumSchema = z.enum(['id','slug','titleAr','titleEn','descriptionAr','descriptionEn','painPointsAr','painPointsEn','solutionsAr','solutionsEn','mainImage','images','liveUrl','deletedAt','projectId','createdAt','updatedAt']);

export default DemoScalarFieldEnumSchema;
