import { z } from 'zod';

/////////////////////////////////////////
// CLIENT MEMBER SCHEMA
/////////////////////////////////////////

export const ClientMemberSchema = z.object({
  id: z.string(),
  position: z.string().nullish(),
  isPrimary: z.boolean().nullish(),
  clientId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ClientMember = z.infer<typeof ClientMemberSchema>

export default ClientMemberSchema;
