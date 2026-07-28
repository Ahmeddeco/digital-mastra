'use server'

import { DeleteActionState } from "@/components/backend/Delete"
import prisma from "@/lib/prisma"
import MemberSchema from "@/schemas/MemberSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addMemberAction ----------------------------- */
export const addMemberAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: MemberSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { clientId, userId, isPrimary, position } = submission.value

  try {
    await prisma.member.upsert({
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
  redirect("/server/members")
}

/* ----------------------------- editMemberAction ---------------------------- */
export const editMemberAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: MemberSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { clientId, userId, isPrimary, position } = submission.value

  try {
    await prisma.member.update({
      where: { clientId_userId: { clientId, userId } },
      data: {
        clientId, userId, isPrimary: isPrimary ?? false, position

      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Data update failed, please ensure the ID is correct."],
    })
  }

  updateTag("members")
  redirect("/server/members")
}

/* ---------------------------- deleteMemberAction --------------------------- */
export const deleteMemberAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "Item ID not found" }
  }

  try {
    await prisma.member.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion process." }
  }

  updateTag("members")
  refresh()
  return { success: true, error: null }
}