import { z } from 'zod';

/////////////////////////////////////////
// CLIENT MEMBER SCHEMA
/////////////////////////////////////////

export const ClientMemberSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  userId: z.string(),
  position: z.string().nullish(),
  isPrimary: z.boolean(),
})

export type ClientMember = z.infer<typeof ClientMemberSchema>

export default ClientMemberSchema;
