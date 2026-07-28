import { z } from 'zod';

export const ServiceScalarFieldEnumSchema = z.enum(['id','nameAr','nameEn','category','descriptionAr','descriptionEn','createdAt','updatedAt']);

export default ServiceScalarFieldEnumSchema;
