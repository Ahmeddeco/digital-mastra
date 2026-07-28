import { z } from 'zod';

/////////////////////////////////////////
// MEMBER SCHEMA
/////////////////////////////////////////

export const MemberSchema = z.object({
  id: z.string(),
  position: z.string().nullish(),
  isPrimary: z.boolean().nullish(),
  clientId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Member = z.infer<typeof MemberSchema>

export default MemberSchema;
