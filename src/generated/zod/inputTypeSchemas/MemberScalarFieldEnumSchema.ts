import { z } from 'zod';

export const MemberScalarFieldEnumSchema = z.enum(['id','position','isPrimary','clientId','userId','createdAt','updatedAt']);

export default MemberScalarFieldEnumSchema;
