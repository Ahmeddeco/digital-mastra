"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllDemosForPage ---------------------------- */
export const getAllDemosForPage = async (size: number, page: number) => {
  cacheLife("days")
  cacheTag('projects')

  try {
    const totalClients = await prisma.demo.count()
    const totalPages = Math.ceil(totalClients / size)
    const data = await prisma.demo.findMany({
      select: {
        id: true, titleEn: true, slug: true, mainImage: true, category: true,
        project: { select: { titleEn: true, id: true, createdAt: true } }
      },
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
    })
    return { data, totalPages, totalClients }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneDemo ------------------------------ */
export const getOneDemo = async (id: string) => {
  cacheLife("days")
  cacheTag('projects')

  try {
    return await prisma.demo.findUnique({
      where: { id },
      include: {
        project: { select: { titleAr: true, titleEn: true, id: true } }
      }
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------- getAllDemosForSelect ------------------------- */
export const getAllDemosForSelect = async () => {
  cacheLife("days")
  cacheTag('projects')

  try {
    return await prisma.demo.findMany({
      select: { id: true, titleAr: true, titleEn: true },
      orderBy: { createdAt: "desc", }
    })
  } catch (error) {
    console.error(error)
  }
}
/* ---------------------- getAllDemosForDevelopmentPage --------------------- */
export const getAllDemosForProjectsPage = async () => {
  cacheLife("days")
  cacheTag('projects')

  try {
    return await prisma.demo.findMany({
      include: { project: true },
      orderBy: { createdAt: "desc", }
    })
  } catch (error) {
    console.error(error)
  }
}