import { z } from 'zod'

export const ClientMemberSchema = z.object({
  id: z.string().nullish(),
  clientId: z.string(),
  userId: z.string(),
  position: z.string().nullish(),
  isPrimary: z.boolean().nullish(),
})

export type ClientMember = z.infer<typeof ClientMemberSchema>

export default ClientMemberSchema
