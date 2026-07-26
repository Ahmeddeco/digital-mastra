import { z } from 'zod'

export const ClientSchema = z.object({
  id: z.string().nullish(),
  companyName: z.string().max(256),
  logo: z.string().nullish(),
  tel: z.string().min(10).max(15),
  secondaryTel: z.string().min(10).max(15).nullish(),
  lat: z.string().nullish(),
  lng: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  userId: z.string(),
})

export type Client = z.infer<typeof ClientSchema>

export default ClientSchema
