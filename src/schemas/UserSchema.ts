import RoleSchema from "@/generated/zod/inputTypeSchemas/RoleSchema"
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().nullish(),
  role: RoleSchema,
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullish(),
  idImage: z.string().nullish(),
  mobile: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema
