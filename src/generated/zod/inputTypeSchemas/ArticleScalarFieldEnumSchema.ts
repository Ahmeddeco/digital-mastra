import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum(['id','titleAr','titleEn','descriptionAr','descriptionEn','articleBodyAr','articleBodyEn','resources','createdAt','updatedAt']);

export default ArticleScalarFieldEnumSchema;
