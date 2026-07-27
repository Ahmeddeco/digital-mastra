import { z } from 'zod';

export const DemoScalarFieldEnumSchema = z.enum(['id','slug','titleAr','titleEn','category','tags','descriptionAr','descriptionEn','painPointsAr','painPointsEn','solutionsAr','solutionsEn','mainImage','images','liveUrl','isFeatured','deletedAt','projectId','createdAt','updatedAt']);

export default DemoScalarFieldEnumSchema;
