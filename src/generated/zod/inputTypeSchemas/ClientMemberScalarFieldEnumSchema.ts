import { z } from 'zod';

export const ClientMemberScalarFieldEnumSchema = z.enum(['id','clientId','userId','position','isPrimary']);

export default ClientMemberScalarFieldEnumSchema;
