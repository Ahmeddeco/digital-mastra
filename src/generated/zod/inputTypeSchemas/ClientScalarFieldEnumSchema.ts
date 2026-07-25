import { z } from 'zod';

export const ClientScalarFieldEnumSchema = z.enum(['id','company','tel','secondaryTel','email','lat','lng','city','state','country','createdAt','updatedAt','userId']);

export default ClientScalarFieldEnumSchema;
