import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','idImage','role','mobile','deletedAt','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
