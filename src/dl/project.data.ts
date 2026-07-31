"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllProjectsForPage ---------------------------- */
export const getAllProjectsForPage = async (size: number, page: number) => {
  cacheLife("days")
  cacheTag('projects')

  try {
    const totalClients = await prisma.project.count()
    const totalPages = Math.ceil(totalClients / size)
    const data = await prisma.project.findMany({
      select: {
        id: true, titleAr: true, titleEn: true, status: true, startDate: true,
        client: { select: { companyName: true, id: true } },
        services: { select: { nameAr: true, nameEn: true, id: true } },
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

/* ---------------------------- getOneProject ------------------------------ */
export const getOneProject = async (id: string) => {
  cacheLife("days")
  cacheTag('projects')

  try {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, companyName: true } },
        services: { select: { nameAr: true, nameEn: true, id: true } }
      }
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------- getAllProjectsForSelect ------------------------- */
export const getAllProjectsForSelect = async () => {
  cacheLife("days")
  cacheTag('projects')

  try {
    return await prisma.project.findMany({
      select: { id: true, titleAr: true, titleEn: true },
      orderBy: { titleEn: "asc", titleAr: "asc" }
    })
  } catch (error) {
    console.error(error)

  }
}