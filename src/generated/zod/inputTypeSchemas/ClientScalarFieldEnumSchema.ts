import { z } from 'zod';

export const ClientScalarFieldEnumSchema = z.enum(['id','companyName','industry','logo','taxId','tel','secondaryTel','website','city','state','country','isArchived','deletedAt','createdAt','updatedAt']);

export default ClientScalarFieldEnumSchema;
