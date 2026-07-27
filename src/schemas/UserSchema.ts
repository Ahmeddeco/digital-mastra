import RoleSchema from "@/generated/zod/inputTypeSchemas/RoleSchema"
import { z } from 'zod'

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().nullish(),
  name: z.string(),
  email: z.string(),
  image: z.string().url().nullish(),
  idImage: z.string().url().nullish(),
  mobile: z.string().min(10).max(14).nullish(),
  deletedAt: z.date().nullish(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema
