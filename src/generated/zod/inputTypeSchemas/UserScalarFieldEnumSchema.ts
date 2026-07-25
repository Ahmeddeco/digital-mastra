import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','idImage','role','createdAt','updatedAt','mobile']);

export default UserScalarFieldEnumSchema;
