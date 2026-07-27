import { z } from 'zod';

export const ClientMemberScalarFieldEnumSchema = z.enum(['id','position','isPrimary','clientId','userId','createdAt','updatedAt']);

export default ClientMemberScalarFieldEnumSchema;
