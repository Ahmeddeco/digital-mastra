'use server'

import { DeleteActionState } from "@/components/backend/Delete"
import prisma from "@/lib/prisma"
import DemoSchema from "@/schemas/DemoSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addProjectAction ----------------------------- */
export const addDemoAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: DemoSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { images, mainImage, titleAr, slug, titleEn, deletedAt, descriptionAr, descriptionEn, liveUrl, painPointsAr, painPointsEn, projectId, solutionsAr, solutionsEn } = submission.value

  try {
    await prisma.demo.upsert({
      where: { slug },
      create: { images, slug, mainImage, titleAr, titleEn, deletedAt, descriptionAr, descriptionEn, liveUrl, painPointsAr, painPointsEn, projectId, solutionsAr, solutionsEn },
      update: { images, slug, mainImage, titleAr, titleEn, deletedAt, descriptionAr, descriptionEn, liveUrl, painPointsAr, painPointsEn, projectId, solutionsAr, solutionsEn },
    })
  } catch (error) {
    console.error("Error creating project:", error)
    return submission.reply({
      formErrors: ["حدث خطأ أثناء حفظ البيانات، يرجى المحاولة لاحقاً"],
    })
  }
  updateTag("demos")
  redirect("/server/demos")
}

/* ----------------------------- editDemoAction ---------------------------- */
export const editDemoAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: DemoSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { id, images, mainImage, titleAr, slug, titleEn, deletedAt, descriptionAr, descriptionEn, liveUrl, painPointsAr, painPointsEn, projectId, solutionsAr, solutionsEn } = submission.value

  try {
    await prisma.demo.update({
      where: { id: id as string },
      data: { images, slug, mainImage, titleAr, titleEn, deletedAt, descriptionAr, descriptionEn, liveUrl, painPointsAr, painPointsEn, projectId, solutionsAr, solutionsEn },
    })
  } catch (error) {
    console.error("Error updating demo:", error)
    return submission.reply({
      formErrors: ["حدث خطأ أثناء حفظ البيانات، يرجى المحاولة لاحقاً"],
    })
  }

  updateTag("demos")
  redirect("/server/demos")
}

/* ---------------------------- deleteDemoAction --------------------------- */
export const deleteDemoAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "Demo ID not found" }
  }

  try {
    await prisma.demo.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion Demo." }
  }

  updateTag("demos")
  refresh()
  return { success: true, error: null }
}