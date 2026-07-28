import { z } from 'zod'

export const MemberSchema = z.object({
  id: z.string().nullish(),
  clientId: z.string(),
  userId: z.string(),
  position: z.string().nullish(),
  isPrimary: z.boolean().nullish(),
})

export type ClientMember = z.infer<typeof MemberSchema>

export default MemberSchema
