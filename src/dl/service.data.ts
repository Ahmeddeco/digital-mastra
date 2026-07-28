"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllServicesForPage ---------------------------- */
export const getAllServicesForPage = async (size: number, page: number) => {
  cacheLife("weeks")
  cacheTag('services')

  try {
    const totalClients = await prisma.service.count()
    const totalPages = Math.ceil(totalClients / size)
    const data = await prisma.service.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: { nameEn: "asc" },
    })
    return { data, totalPages, totalClients }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneService ------------------------------ */
export const getOneService = async (id: string) => {
  cacheLife("weeks")
  cacheTag('services')

  try {
    return await prisma.service.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------- getAllServicesForSelect ------------------------- */
export const getAllServicesForSelect = async () => {
  cacheLife("weeks")
  cacheTag('services')

  try {
    return await prisma.service.findMany({
      select: { id: true, nameAr: true, nameEn: true },
      orderBy: { nameEn: "asc" }
    })
  } catch (error) {
    console.error(error)

  }
}