import { z } from 'zod';

export const ClientScalarFieldEnumSchema = z.enum(['id','companyName','logo','tel','secondaryTel','lat','lng','city','state','country','createdAt','updatedAt','userId']);

export default ClientScalarFieldEnumSchema;
