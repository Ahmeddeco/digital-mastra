'use server'

import { DeleteActionState } from "@/components/backend/Delete"
import prisma from "@/lib/prisma"
import ServiceSchema from "@/schemas/ServiceSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addServiceAction ----------------------------- */
export const addServiceAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ServiceSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { category, nameAr, nameEn, descriptionAr, descriptionEn } = submission.value

  try {
    await prisma.service.create({
      data: { category, nameAr, nameEn, descriptionAr, descriptionEn }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }

  updateTag("services")
  redirect("/server/services")
}

/* ----------------------------- editServiceAction ---------------------------- */
export const editServiceAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ServiceSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { category, nameAr, nameEn, descriptionAr, descriptionEn, id } = submission.value

  try {
    await prisma.service.update({
      where: { id: id as string },
      data: { category, nameAr, nameEn, descriptionAr, descriptionEn }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Data update failed, please ensure the ID is correct."],
    })
  }

  updateTag("services")
  redirect("/server/services")
}

/* ---------------------------- deleteServiceAction --------------------------- */
export const deleteServiceAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "Service ID not found" }
  }

  try {
    await prisma.service.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion service." }
  }

  updateTag("services")
  refresh()
  return { success: true, error: null }
}