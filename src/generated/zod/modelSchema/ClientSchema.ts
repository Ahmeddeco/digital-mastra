import { z } from 'zod';

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
  id: z.string(),
  companyName: z.string(),
  industry: z.string().nullish(),
  logo: z.string().nullish(),
  taxId: z.string().nullish(),
  tel: z.string(),
  secondaryTel: z.string().nullish(),
  website: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  isArchived: z.boolean(),
  deletedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Client = z.infer<typeof ClientSchema>

export default ClientSchema;
