'use server'

import { DeleteActionState } from "@/components/backend/Delete"
import prisma from "@/lib/prisma"
import ProjectSchema from "@/schemas/ProjectSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addProjectAction ----------------------------- */
export const addProjectAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProjectSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  const { titleAr, titleEn, descriptionAr, descriptionEn, clientId, status, startDate, endDate, metadata, services } = submission.value
  const formattedMetadata = metadata?.reduce<Record<string, string>>((acc, item) => {
    if (item.key && item.key.trim() !== "") {
      acc[item.key] = item.value
    }
    return acc
  }, {})

  try {
    await prisma.project.create({
      data: {
        titleAr,
        titleEn,
        descriptionAr,
        descriptionEn,
        clientId,
        status,
        startDate,
        services: services ? {
          connect: services.map(id => ({ id }))
        } : undefined,
        endDate,
        metadata: formattedMetadata && Object.keys(formattedMetadata).length > 0
          ? formattedMetadata
          : undefined,
      },
    })
  } catch (error) {
    console.error("Error creating project:", error)
    return submission.reply({
      formErrors: ["حدث خطأ أثناء حفظ البيانات، يرجى المحاولة لاحقاً"],
    })
  }
  updateTag("projects")
  redirect("/server/projects")
}

/* ----------------------------- editProjectAction ---------------------------- */
export const editProjectAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProjectSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  const { id, titleAr, titleEn, descriptionAr, descriptionEn, clientId, status, startDate, endDate, metadata, services } = submission.value
  const formattedMetadata = metadata?.reduce<Record<string, string>>((acc, item) => {
    if (item.key && item.key.trim() !== "") {
      acc[item.key] = item.value
    }
    return acc
  }, {})

  try {
    await prisma.project.update({
      where: { id: id as string },
      data: {
        titleAr,
        titleEn,
        descriptionAr,
        descriptionEn,
        clientId,
        status,
        startDate,
        services: services ? {
          set: services.map(id => ({ id }))
        } : undefined,
        endDate,
        metadata: formattedMetadata && Object.keys(formattedMetadata).length > 0
          ? formattedMetadata
          : undefined,
      },
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Data update failed, please ensure the ID is correct."],
    })
  }

  updateTag("projects")
  redirect("/server/projects")
}

/* ---------------------------- deleteProjectAction --------------------------- */
export const deleteProjectAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "project ID not found" }
  }

  try {
    await prisma.project.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion project." }
  }

  updateTag("projects")
  refresh()
  return { success: true, error: null }
}