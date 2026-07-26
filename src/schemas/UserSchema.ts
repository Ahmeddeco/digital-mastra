import RoleSchema from "@/generated/zod/inputTypeSchemas/RoleSchema"
import { z } from 'zod'

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().nullish(),
  name: z.string().max(128),
  email: z.string().email(),
  image: z.string().nullish(),
  idImage: z.string().nullish(),
  mobile: z.string().min(10).max(14).nullish(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema
