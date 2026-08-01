'use server'

import { DeleteActionState } from "@/components/backend/Delete"
import prisma from "@/lib/prisma"
import ArticleSchema from "@/schemas/ArticleSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"

/* ----------------------------- addArticleAction ----------------------------- */
export const addArticleAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ArticleSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { descriptionAr, descriptionEn, articleBodyAr, articleBodyEn, images, mainImage, resources, titleAr, titleEn, category } = submission.value


  console.log('formData from addArticleAction', formData)

  try {
    await prisma.article.create({
      data: { descriptionAr, descriptionEn, articleBodyAr, articleBodyEn, images, mainImage, resources, titleAr, titleEn, category }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Server Error"],
    })
  }

  updateTag("articles")
  redirect("/server/articles")
}

/* ----------------------------- editArticleAction ---------------------------- */
export const editArticleAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ArticleSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const { id, descriptionAr, descriptionEn, articleBodyAr, articleBodyEn, images, mainImage, resources, titleAr, titleEn, category } = submission.value

  try {
    await prisma.article.update({
      where: { id: id as string },
      data: { descriptionAr, descriptionEn, articleBodyAr, articleBodyEn, images, mainImage, resources, titleAr, titleEn, category }
    })
  } catch (error) {
    console.error(error)
    return submission.reply({
      formErrors: ["Data update failed, please ensure the ID is correct."],
    })
  }

  updateTag("articles")
  redirect("/server/articles")
}

/* ---------------------------- deleteArticleAction --------------------------- */
export const deleteArticleAction = async (
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> => {
  const id = formData.get("id") as string

  if (!id) {
    return { success: false, error: "article ID not found" }
  }

  try {
    await prisma.article.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Delete Action Error:", error)
    return { success: false, error: "An error occurred during the deletion article." }
  }

  updateTag("articles")
  refresh()
  return { success: true, error: null }
}