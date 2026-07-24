import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','role','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
