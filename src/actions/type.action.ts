'use server'

import prisma from "@/lib/prisma"
import ProjectTypeSchema from "@/schemas/ProjectTypeSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addProjectTypeAction ----------------------------- */
export const addProjectTypeAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProjectTypeSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.projectType.upsert({
      where: { title: submission.value.title },
      create: {
        title: submission.value.title,
        category: submission.value.category,
      },
      update: {
        title: submission.value.title,
        category: submission.value.category,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }
  updateTag("types")
  redirect("/server/types")
}

/* ----------------------------- editProjectTypeAction ---------------------------- */
export const editProjectTypeAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProjectTypeSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.projectType.update({
      where: {
        id: submission.value.id!,
      },
      data: {
        title: submission.value.title,
        category: submission.value.category,
      }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"],
    })
  }
  updateTag("types")
  redirect("/server/types")
}

/* ---------------------------- deleteUserAction --------------------------- */
export const deleteUserAction = async (formData: FormData) => {
  const id = formData.get("id")
  try {
    await prisma.projectType.delete({
      where: {
        id: id as string
      }
    })
  } catch (error) {
    console.error(error)
  }
  updateTag("types")
  refresh()
}