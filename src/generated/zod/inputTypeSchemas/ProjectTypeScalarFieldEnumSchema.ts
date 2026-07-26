import { z } from 'zod';

export const ProjectTypeScalarFieldEnumSchema = z.enum(['id','title','category','createdAt','updatedAt']);

export default ProjectTypeScalarFieldEnumSchema;
