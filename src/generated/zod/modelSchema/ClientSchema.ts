import { z } from 'zod';

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
  id: z.string(),
  company: z.string(),
  tel: z.string(),
  secondaryTel: z.string().nullish(),
  email: z.string().nullish(),
  lat: z.string().nullish(),
  lng: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export type Client = z.infer<typeof ClientSchema>

export default ClientSchema;
