import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "./prisma"
import { Role } from "@/generated/prisma/enums"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string", // أو استبدالها بنوع Enum لديك إذا أردت
        required: false,
        defaultValue: Role.user,
      },
    },
  },

  /* ---------------------------- socialProviders --------------------------- */
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})