import { z } from 'zod';

export const ServiceScalarFieldEnumSchema = z.enum(['id','nameAr','nameEn','category','description','createdAt','updatedAt']);

export default ServiceScalarFieldEnumSchema;
