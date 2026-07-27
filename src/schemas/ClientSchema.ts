import { z } from 'zod'

export const ClientSchema = z.object({
  id: z.string().nullish(),
  companyName: z.string(),
  industry: z.string().nullish(),
  logo: z.string().url().nullish(),
  taxId: z.string().nullish(),
  workTel: z.string().min(10).max(14),
  secondaryTel: z.string().min(10).max(14).nullish(),
  website: z.string().url().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  isArchived: z.boolean().nullish(),
  deletedAt: z.date().nullish(),
})

export type Client = z.infer<typeof ClientSchema>

export default ClientSchema
