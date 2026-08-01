"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllArticlesForPage ---------------------------- */
export const getAllArticlesForPage = async (size: number, page: number) => {
  cacheLife("weeks")
  cacheTag('articles')

  try {
    const totalClients = await prisma.article.count()
    const totalPages = Math.ceil(totalClients / size)
    const data = await prisma.article.findMany({
      skip: (page * size) - size,
      select: { category: true, descriptionAr: true, descriptionEn: true, id: true, mainImage: true, titleAr: true, titleEn: true, },
      take: size,
      orderBy: { createdAt: "desc" },
    })
    return { data, totalPages, totalClients }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneArticle ------------------------------ */
export const getOneArticle = async (id: string) => {
  cacheLife("weeks")
  cacheTag('articles')

  try {
    return await prisma.article.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------- getAllArticlesForSelect ------------------------- */
export const getAllArticlesForSelect = async () => {
  cacheLife("weeks")
  cacheTag('articles')

  try {
    return await prisma.article.findMany({
      select: { id: true, titleEn: true, titleAr: true },
      orderBy: { createdAt: "desc" }
    })
  } catch (error) {
    console.error(error)

  }
}