'use server'

import prisma from "@/lib/prisma"
import ClientMemberSchema from "@/schemas/ClientMemberSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addMemberAction ----------------------------- */
export const addMemberAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ClientMemberSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { clientId, userId, isPrimary, position } = submission.value

  try {
    await prisma.clientMember.upsert({
      where: { clientId_userId: { clientId, userId } },
      create: {
        clientId, userId, isPrimary: isPrimary ?? false, position
      },
      update: {
        clientId, userId, isPrimary: isPrimary ?? false, position

      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }

  updateTag("members")
  redirect("/server/clients/members")
}

/* ----------------------------- editMemberAction ---------------------------- */
export const editMemberAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ClientMemberSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { clientId, userId, isPrimary, position } = submission.value

  try {
    await prisma.clientMember.update({
      where: { clientId_userId: { clientId, userId } },
      data: {
        clientId, userId, isPrimary: isPrimary ?? false, position

      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"],
    })
  }

  updateTag("members")
  redirect("/server/clients/members")
}

/* ---------------------------- deleteMemberAction --------------------------- */
export const deleteMemberAction = async (formData: FormData) => {
  const id = formData.get("id")
  try {
    await prisma.clientMember.update({
      where: { id: id as string },
      data: { isArchived: true, deletedAt: new Date() }
    })
  } catch (error) {
    console.error(error)
  }

  updateTag("members")
  refresh()
}