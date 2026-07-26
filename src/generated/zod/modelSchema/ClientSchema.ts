import { z } from 'zod';

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
  id: z.string(),
  companyName: z.string(),
  logo: z.string().nullish(),
  tel: z.string(),
  secondaryTel: z.string().nullish(),
  lat: z.number().nullish(),
  lng: z.number().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export type Client = z.infer<typeof ClientSchema>

export default ClientSchema;
