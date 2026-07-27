import { z } from 'zod';

export const ClientScalarFieldEnumSchema = z.enum(['id','companyName','industry','logo','taxId','workTel','secondaryTel','website','city','state','country','isArchived','deletedAt','createdAt','updatedAt']);

export default ClientScalarFieldEnumSchema;
