import { z } from 'zod';

export const ProjectTypeScalarFieldEnumSchema = z.enum(['id','title','createdAt','updatedAt']);

export default ProjectTypeScalarFieldEnumSchema;
