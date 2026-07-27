import { z } from 'zod';

export const ProjectScalarFieldEnumSchema = z.enum(['id','code','title','description','clientId','status','startDate','endDate','metadata','isArchived','deletedAt','createdAt','updatedAt']);

export default ProjectScalarFieldEnumSchema;
